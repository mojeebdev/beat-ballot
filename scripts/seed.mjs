import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");

const sourceMap = {
  olamideCatalog: ["Apple Music — Olamide catalogue", "https://music.apple.com/ng/artist/olamide/389401008"],
  davidoCatalog: ["Apple Music — Davido catalogue", "https://music.apple.com/ng/artist/davido/254654363"],
  turntableOlamide: ["TurnTable Charts — 99 at No. 1", "https://www.turntablecharts.com/news/1772"],
  turntableDavido: ["TurnTable Charts — Davido singles performance", "https://www.turntablecharts.com/news/2186-every-davido-s-first-single-of-the-year-and-how-they-performed-on-the-official-singles-chart"],
  fallGold: ["BellaNaija — Fall Gold certification", "https://www.bellanaija.com/2020/05/davido-fall-gold/"],
};

const catalogue = await readFile(join(process.cwd(), "data", "ballot.ts"), "utf8");
const songMatcher = /\{\s*id: "([^"]+)",\s*title: "([^"]+)",\s*artist: "(Olamide|Davido)",\s*year: (\d+),\s*role: "(Lead|Co-lead|Feature)",\s*milestone: "([^"]+)",\s*evidenceLevel: "([^"]+)",\s*source: source\.(\w+),\s*\},/g;
const roundMatcher = /\{\s*id: "(round-\d+)",\s*number: "(\d+) \/ 05",\s*title: "([^"]+)",\s*lens: "([^"]+)",\s*prompt: "([^"]+)",\s*olamideSongId: "([^"]+)",\s*davidoSongId: "([^"]+)",\s*\},/g;
const songs = [...catalogue.matchAll(songMatcher)].map((match) => ({
  id: match[1], title: match[2], artist: match[3], year: Number(match[4]), role: match[5], milestone: match[6], evidence: match[7], source: sourceMap[match[8]],
}));
const rounds = [...catalogue.matchAll(roundMatcher)].map((match) => ({
  id: match[1], number: Number(match[2]), title: match[3], lens: match[4], prompt: match[5], olamide: match[6], davido: match[7],
}));

if (songs.length < 2 || rounds.length !== 5 || songs.some((song) => !song.source)) {
  throw new Error("The canonical catalogue could not be parsed; seed aborted without writing data.");
}

// The neutral shared record is catalogue-only: never eligible for either side.
songs.push({
  id: "neutral-the-money", title: "The Money", artist: "Neutral", year: 2017, role: "Feature",
  milestone: "A shared Davido × Olamide record retained as a neutral catalogue reference, not a ballot entry.",
  evidence: "catalogue context", source: sourceMap.davidoCatalog,
});

const sql = neon(process.env.DATABASE_URL);
for (const song of songs) {
  await sql`
    INSERT INTO songs (id, title, artist, release_year, credited_role, milestone, evidence_level, source_label, source_url, main_ballot_eligible, neutral)
    VALUES (${song.id}, ${song.title}, ${song.artist}, ${song.year}, ${song.role}, ${song.milestone}, ${song.evidence}, ${song.source[0]}, ${song.source[1]}, ${song.role !== "Feature"}, ${song.artist === "Neutral"})
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, release_year = EXCLUDED.release_year,
      credited_role = EXCLUDED.credited_role, milestone = EXCLUDED.milestone, evidence_level = EXCLUDED.evidence_level,
      source_label = EXCLUDED.source_label, source_url = EXCLUDED.source_url, main_ballot_eligible = EXCLUDED.main_ballot_eligible, neutral = EXCLUDED.neutral
  `;
}

for (const round of rounds) {
  const openAt = round.number === 1 ? "2026-08-14T00:00:00Z" : "2030-01-01T00:00:00Z";
  const closeAt = round.number === 1 ? "2027-01-01T00:00:00Z" : "2030-12-31T23:59:59Z";
  await sql`
    INSERT INTO rounds (id, number, title, lens, prompt, olamide_song_id, davido_song_id, opens_at, closes_at, is_active)
    VALUES (${round.id}, ${round.number}, ${round.title}, ${round.lens}, ${round.prompt}, ${round.olamide}, ${round.davido}, ${openAt}, ${closeAt}, ${round.number === 1})
    ON CONFLICT (id) DO UPDATE SET number = EXCLUDED.number, title = EXCLUDED.title, lens = EXCLUDED.lens, prompt = EXCLUDED.prompt,
      olamide_song_id = EXCLUDED.olamide_song_id, davido_song_id = EXCLUDED.davido_song_id, opens_at = EXCLUDED.opens_at,
      closes_at = EXCLUDED.closes_at, is_active = EXCLUDED.is_active
  `;
}

console.log(`Seeded ${songs.length} catalogue records and ${rounds.length} Season 01 rounds.`);
