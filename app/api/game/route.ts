import { NextResponse } from "next/server";
import { requireUser } from "@/lib/ballot";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const rounds = await sql`
      SELECT id, number, title, lens, prompt, olamide_song_id, davido_song_id
      FROM rounds WHERE is_active = true AND opens_at <= now() AND closes_at > now()
      LIMIT 1
    `;
    const round = rounds[0];

    if (!round) {
      return NextResponse.json(
        { error: "No live round is currently open.", code: "ROUND_UNAVAILABLE" },
        { status: 503 },
      );
    }

    const [events, profileRows, voteRows] = await Promise.all([
      sql`
        SELECT e.id, e.alias, s.artist, s.title, e.created_at
        FROM public_vote_events e
        JOIN votes v ON v.id = e.vote_id
        JOIN songs s ON s.id = e.song_id
        WHERE v.round_id = ${round.id}
        ORDER BY e.created_at DESC LIMIT 10
      `,
      user ? sql`SELECT alias, points FROM profiles WHERE user_id = ${user.id}` : Promise.resolve([]),
      user ? sql`SELECT id FROM votes WHERE user_id = ${user.id} AND round_id = ${round.id}` : Promise.resolve([]),
    ]);
    const hasVoted = voteRows.length > 0;

    if (!hasVoted) {
      return NextResponse.json({
        round,
        viewer: { signedIn: Boolean(user), alias: profileRows[0]?.alias ?? null, hasVoted: false },
        events,
        results: null,
        leaderboard: null,
      });
    }

    const [results, leaderboard] = await Promise.all([
      sql`
        SELECT s.id AS song_id, s.title, s.artist, COUNT(v.id)::int AS votes
        FROM songs s
        LEFT JOIN votes v ON v.song_id = s.id AND v.round_id = ${round.id}
        WHERE s.id IN (${round.olamide_song_id}, ${round.davido_song_id})
        GROUP BY s.id, s.title, s.artist
        ORDER BY votes DESC, s.title ASC
      `,
      sql`
        SELECT alias, points FROM profiles
        WHERE points > 0
        ORDER BY points DESC, created_at ASC
        LIMIT 10
      `,
    ]);

    return NextResponse.json({
      round,
      viewer: { signedIn: true, alias: profileRows[0]?.alias ?? null, hasVoted: true },
      events,
      results,
      leaderboard,
    });
  } catch (error) {
    console.error("Beat Ballot live tally unavailable", error);
    return NextResponse.json(
      { error: "The tally is temporarily unavailable. Please try again shortly.", code: "TALLY_UNAVAILABLE" },
      { status: 503, headers: { "Retry-After": "20" } },
    );
  }
}
