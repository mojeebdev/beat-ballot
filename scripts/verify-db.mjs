import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { Client } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");

const client = new Client(process.env.DATABASE_URL);

async function expectDatabaseFailure(query, pattern) {
  await client.query("SAVEPOINT expected_database_failure");
  await assert.rejects(query(), pattern);
  await client.query("ROLLBACK TO SAVEPOINT expected_database_failure");
  await client.query("RELEASE SAVEPOINT expected_database_failure");
}

await client.connect();
try {
  const catalogue = await client.query("SELECT COUNT(*)::int AS songs FROM songs");
  const rounds = await client.query("SELECT COUNT(*)::int AS rounds FROM rounds");
  assert.equal(catalogue.rows[0].songs, 40);
  assert.equal(rounds.rows[0].rounds, 5);

  const active = await client.query("SELECT id, olamide_song_id FROM rounds WHERE is_active = true");
  assert.equal(active.rowCount, 1);
  const userId = `verify-${randomUUID()}`;
  const requestHash = "a".repeat(64);

  await client.query("BEGIN");
  try {
    await client.query("INSERT INTO profiles (user_id, alias) VALUES ($1, $2)", [userId, `VERIFY-${userId.slice(-8)}`]);
    await expectDatabaseFailure(
      () => client.query("SELECT * FROM cast_ballot_vote($1, $2, $3, $4)", [userId, active.rows[0].id, "neutral-the-money", requestHash]),
      /BB_INVALID_BALLOT/,
    );
    const vote = await client.query("SELECT * FROM cast_ballot_vote($1, $2, $3, $4)", [userId, active.rows[0].id, active.rows[0].olamide_song_id, requestHash]);
    assert.equal(vote.rowCount, 1);

    const score = await client.query("SELECT points FROM profiles WHERE user_id = $1", [userId]);
    const events = await client.query("SELECT alias, song_id FROM public_vote_events WHERE vote_id = $1", [vote.rows[0].vote_id]);
    assert.equal(score.rows[0].points, 1);
    assert.equal(events.rowCount, 1);
    assert.equal(events.rows[0].song_id, active.rows[0].olamide_song_id);

    await expectDatabaseFailure(
      () => client.query("SELECT * FROM cast_ballot_vote($1, $2, $3, $4)", [userId, active.rows[0].id, active.rows[0].olamide_song_id, requestHash]),
      /BB_RATE_LIMITED/,
    );
    await expectDatabaseFailure(
      () => client.query("SELECT * FROM cast_ballot_vote($1, $2, $3, $4)", [userId, active.rows[0].id, active.rows[0].olamide_song_id, "b".repeat(64)]),
      /BB_DUPLICATE_VOTE/,
    );
  } finally {
    await client.query("ROLLBACK");
  }
  console.log("Verified Neon schema, idempotent seed shape, invalid-ballot rejection, first vote, rate limit, event emission, points, and duplicate rejection (rolled back test data).");
} finally {
  await client.end();
}
