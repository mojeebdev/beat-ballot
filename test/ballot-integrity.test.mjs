import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Season 01 retains exactly five editorial matchups", async () => {
  const catalogue = await read("data/ballot.ts");
  assert.equal((catalogue.match(/id: "round-\d+"/g) ?? []).length, 5);
  assert.match(catalogue, /id: "round-01"[\s\S]*?olamideSongId: "olamide-eni-duro"[\s\S]*?davidoSongId: "davido-dami-duro"/);
});

test("shared record is neutral and cannot be a primary ballot choice", async () => {
  const catalogue = await read("data/ballot.ts");
  assert.match(catalogue, /id: "neutral-the-money"[\s\S]*?artist: "Neutral"[\s\S]*?role: "Feature"/);
  const migration = await read("db/migrations/001_ballot_core.sql");
  assert.match(migration, /CHECK \(NOT neutral OR NOT main_ballot_eligible\)/);
});

test("database, not the client, enforces one valid vote and a safe event", async () => {
  const migration = await read("db/migrations/001_ballot_core.sql");
  const client = await read("components/ballot-experience.tsx");
  assert.match(migration, /UNIQUE \(user_id, round_id\)/);
  assert.match(migration, /CREATE OR REPLACE FUNCTION cast_ballot_vote/);
  assert.match(migration, /BB_DUPLICATE_VOTE/);
  assert.match(migration, /vote_request_limits/);
  assert.match(migration, /INSERT INTO public_vote_events/);
  assert.doesNotMatch(client, /localStorage|NEXT_PUBLIC_BALLOT_MODE|preview pick/i);
});

test("game API gates result totals and leaderboard until the verified vote exists", async () => {
  const route = await read("app/api/game/route.ts");
  assert.match(route, /if \(!hasVoted\)[\s\S]*?results: null,[\s\S]*?leaderboard: null/);
  assert.match(route, /ORDER BY points DESC/);
  assert.match(route, /ORDER BY e\.created_at DESC LIMIT 10/);
});
