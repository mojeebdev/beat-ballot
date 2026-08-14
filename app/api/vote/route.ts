import { NextResponse } from "next/server";
import { requestHash, requireUser } from "@/lib/ballot";
import { sql } from "@/lib/db";

type VoteBody = { roundId?: unknown; songId?: unknown };

export async function POST(request: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Sign in to cast a ballot." }, { status: 401 });

  const body = await request.json().catch(() => null) as VoteBody | null;
  if (typeof body?.roundId !== "string" || typeof body.songId !== "string") {
    return NextResponse.json({ error: "Choose a valid song in the current round." }, { status: 400 });
  }

  try {
    await sql`SELECT * FROM cast_ballot_vote(${user.id}, ${body.roundId}, ${body.songId}, ${requestHash(request, user.id)})`;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("BB_ALIAS_REQUIRED")) return NextResponse.json({ error: "Set your fan alias before voting." }, { status: 428 });
    if (message.includes("BB_DUPLICATE_VOTE")) return NextResponse.json({ error: "You have already voted in this round." }, { status: 409 });
    if (message.includes("BB_RATE_LIMITED")) {
      return NextResponse.json({ error: "Give the ballot a few seconds, then try again." }, { status: 429, headers: { "Retry-After": "8" } });
    }
    if (message.includes("BB_INVALID_BALLOT") || message.includes("BB_ROUND_CLOSED")) {
      return NextResponse.json({ error: "That ballot is no longer available." }, { status: 422 });
    }
    console.error("Beat Ballot vote unavailable", error);
    return NextResponse.json(
      { error: "The tally is temporarily unavailable. Please try again shortly." },
      { status: 503, headers: { "Retry-After": "20" } },
    );
  }
}
