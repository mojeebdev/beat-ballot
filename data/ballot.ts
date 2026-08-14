export type Artist = "Olamide" | "Davido" | "Neutral";

export type SongRole = "Lead" | "Co-lead" | "Feature";

export type EvidenceLevel = "chart record" | "catalogue context" | "cultural marker";

export type Song = {
  id: string;
  title: string;
  artist: Artist;
  year: number;
  role: SongRole;
  project?: string;
  milestone: string;
  evidenceLevel: EvidenceLevel;
  source: {
    label: string;
    url: string;
  };
};

export type BattleRound = {
  id: string;
  number: string;
  title: string;
  lens: string;
  prompt: string;
  olamideSongId: string;
  davidoSongId: string;
};

const source = {
  olamideCatalog: {
    label: "Apple Music — Olamide catalogue",
    url: "https://music.apple.com/ng/artist/olamide/389401008",
  },
  davidoCatalog: {
    label: "Apple Music — Davido catalogue",
    url: "https://music.apple.com/ng/artist/davido/254654363",
  },
  turntableOlamide: {
    label: "TurnTable Charts — 99 at No. 1",
    url: "https://www.turntablecharts.com/news/1772",
  },
  turntableDavido: {
    label: "TurnTable Charts — Davido singles performance",
    url: "https://www.turntablecharts.com/news/2186-every-davido-s-first-single-of-the-year-and-how-they-performed-on-the-official-singles-chart",
  },
  fallGold: {
    label: "BellaNaija — Fall Gold certification",
    url: "https://www.bellanaija.com/2020/05/davido-fall-gold/",
  },
} as const;

/**
 * Catalogue policy: only Lead and Co-lead records enter the primary ballot.
 * Features are researched and retained for a later, separately-labelled Feature Hall.
 */
export const songs: Song[] = [
  {
    id: "olamide-eni-duro",
    title: "Eni Duro",
    artist: "Olamide",
    year: 2010,
    role: "Lead",
    milestone: "An early street-facing breakthrough in Olamide's recorded catalogue.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-omo-to-shan",
    title: "Omo To Shan",
    artist: "Olamide",
    year: 2010,
    role: "Lead",
    milestone: "Part of the formative run that introduced Olamide's Yoruba rap voice to a wider audience.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-first-of-all",
    title: "First of All",
    artist: "Olamide",
    year: 2012,
    role: "Lead",
    milestone: "A defining early-career record in the artist's transition from breakout to mainstream force.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-voice-of-the-street",
    title: "Voice of the Street",
    artist: "Olamide",
    year: 2012,
    role: "Lead",
    milestone: "The title captures the street-to-mainstream identity central to this era.",
    evidenceLevel: "cultural marker",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-durosoke",
    title: "Durosoke",
    artist: "Olamide",
    year: 2013,
    role: "Lead",
    milestone: "A major party-era calling card from Olamide's 2013 run.",
    evidenceLevel: "cultural marker",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-turn-up",
    title: "Turn Up",
    artist: "Olamide",
    year: 2014,
    role: "Lead",
    milestone: "A high-energy record from an era that widened Olamide's pop reach.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-story-for-the-gods",
    title: "Story for the Gods",
    artist: "Olamide",
    year: 2014,
    role: "Lead",
    milestone: "An important 2014 record in the artist's crossover catalogue.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-bobo",
    title: "Bobo",
    artist: "Olamide",
    year: 2015,
    role: "Lead",
    milestone: "Known widely as the Shakiti Bobo moment — a lasting dance and street-pop reference point.",
    evidenceLevel: "cultural marker",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-who-you-epp",
    title: "Who You Epp?",
    artist: "Olamide",
    year: 2016,
    role: "Lead",
    milestone: "A culture-driving call-and-response record that became a defining phrase of its moment.",
    evidenceLevel: "cultural marker",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-wo",
    title: "Wo!!",
    artist: "Olamide",
    year: 2017,
    role: "Lead",
    milestone: "A signature dance-floor and street-pop record from Olamide's 2017 era.",
    evidenceLevel: "cultural marker",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-science-student",
    title: "Science Student",
    artist: "Olamide",
    year: 2018,
    role: "Lead",
    milestone: "A boundary-pushing 2018 record that sparked national conversation as well as dance challenges.",
    evidenceLevel: "cultural marker",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-motigbana",
    title: "Motigbana",
    artist: "Olamide",
    year: 2018,
    role: "Lead",
    milestone: "A lighter, melodic late-2018 turn in the catalogue.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-pawon",
    title: "Pawon",
    artist: "Olamide",
    year: 2019,
    role: "Lead",
    milestone: "A high-tempo record closely tied to the late-2019 dance-floor conversation.",
    evidenceLevel: "cultural marker",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-infinity",
    title: "Infinity",
    artist: "Olamide",
    year: 2020,
    role: "Co-lead",
    milestone: "Olamide and Omah Lay's collaboration became one of the era's most cited pairings.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-loading",
    title: "Loading",
    artist: "Olamide",
    year: 2020,
    role: "Co-lead",
    milestone: "A melodic 2020 collaboration that expanded the artist's contemporary crossover run.",
    evidenceLevel: "catalogue context",
    source: source.olamideCatalog,
  },
  {
    id: "olamide-rock",
    title: "Rock",
    artist: "Olamide",
    year: 2021,
    role: "Lead",
    milestone: "Reached No. 1 on the Official Nigeria Top 100.",
    evidenceLevel: "chart record",
    source: source.turntableOlamide,
  },
  {
    id: "olamide-omo-ope",
    title: "Omo Ope",
    artist: "Olamide",
    year: 2021,
    role: "Co-lead",
    milestone: "Reached No. 1 on the Official Nigeria Top 100.",
    evidenceLevel: "chart record",
    source: source.turntableOlamide,
  },
  {
    id: "olamide-amapiano",
    title: "Amapiano",
    artist: "Olamide",
    year: 2023,
    role: "Co-lead",
    milestone: "Reached No. 1 on the Official Nigeria Top 100.",
    evidenceLevel: "chart record",
    source: source.turntableOlamide,
  },
  {
    id: "olamide-99",
    title: "99",
    artist: "Olamide",
    year: 2025,
    role: "Co-lead",
    milestone: "Spent three weeks at No. 1 on the Official Nigeria Top 100.",
    evidenceLevel: "chart record",
    source: source.turntableOlamide,
  },
  {
    id: "davido-back-when",
    title: "Back When",
    artist: "Davido",
    year: 2011,
    role: "Co-lead",
    milestone: "An early record from the run that established Davido's mainstream arrival.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-dami-duro",
    title: "Dami Duro",
    artist: "Davido",
    year: 2011,
    role: "Lead",
    milestone: "A breakout record that remains central to Davido's early catalogue.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-gobe",
    title: "Gobe",
    artist: "Davido",
    year: 2013,
    role: "Lead",
    milestone: "A cornerstone of Davido's 2013 hit run.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-skelewu",
    title: "Skelewu",
    artist: "Davido",
    year: 2013,
    role: "Lead",
    milestone: "A dance-led cultural moment from Davido's early hit-making era.",
    evidenceLevel: "cultural marker",
    source: source.davidoCatalog,
  },
  {
    id: "davido-aye",
    title: "Aye",
    artist: "Davido",
    year: 2014,
    role: "Lead",
    milestone: "A defining romance record from Davido's 2014 catalogue.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-tchelete",
    title: "Tchelete (Goodlife)",
    artist: "Davido",
    year: 2014,
    role: "Co-lead",
    milestone: "A major West African collaboration in the artist's crossover catalogue.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-if",
    title: "IF",
    artist: "Davido",
    year: 2017,
    role: "Lead",
    milestone: "A defining 2017 comeback record and one of the artist's most enduring hooks.",
    evidenceLevel: "cultural marker",
    source: source.davidoCatalog,
  },
  {
    id: "davido-fall",
    title: "Fall",
    artist: "Davido",
    year: 2017,
    role: "Lead",
    milestone: "Reached Gold certification in the United States, marking a major global milestone.",
    evidenceLevel: "chart record",
    source: source.fallGold,
  },
  {
    id: "davido-fia",
    title: "FIA",
    artist: "Davido",
    year: 2017,
    role: "Lead",
    milestone: "One of the essential records from Davido's 2017 resurgence.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-assurance",
    title: "Assurance",
    artist: "Davido",
    year: 2018,
    role: "Lead",
    milestone: "A romantic pop moment that travelled far beyond its release year.",
    evidenceLevel: "cultural marker",
    source: source.davidoCatalog,
  },
  {
    id: "davido-blow-my-mind",
    title: "Blow My Mind",
    artist: "Davido",
    year: 2019,
    role: "Co-lead",
    milestone: "A global-facing collaboration from the A Good Time era.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-risky",
    title: "Risky",
    artist: "Davido",
    year: 2019,
    role: "Co-lead",
    milestone: "A cross-border collaboration from Davido's 2019 run.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-fem",
    title: "FEM",
    artist: "Davido",
    year: 2020,
    role: "Lead",
    milestone: "Reached No. 1; logged 30.3m on-demand streams and 2× Platinum in Nigeria.",
    evidenceLevel: "chart record",
    source: source.turntableDavido,
  },
  {
    id: "davido-jowo",
    title: "Jowo",
    artist: "Davido",
    year: 2020,
    role: "Co-lead",
    milestone: "A melodic collaboration from Davido's A Better Time era.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-no-competition",
    title: "No Competition",
    artist: "Davido",
    year: 2022,
    role: "Co-lead",
    milestone: "Reached No. 1 and 2× Platinum in Nigeria.",
    evidenceLevel: "chart record",
    source: source.turntableDavido,
  },
  {
    id: "davido-unavailable",
    title: "Unavailable",
    artist: "Davido",
    year: 2023,
    role: "Co-lead",
    milestone: "Peaked at No. 2, spent 46 weeks on the chart, and earned 3× Platinum in Nigeria.",
    evidenceLevel: "chart record",
    source: source.turntableDavido,
  },
  {
    id: "davido-feel",
    title: "Feel",
    artist: "Davido",
    year: 2023,
    role: "Lead",
    milestone: "A key record from Davido's Timeless era.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-kante",
    title: "Kante",
    artist: "Davido",
    year: 2023,
    role: "Co-lead",
    milestone: "A cross-continental collaboration from the Timeless era.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
  {
    id: "davido-awuke",
    title: "Awuke",
    artist: "Davido",
    year: 2024,
    role: "Co-lead",
    milestone: "Reached No. 1 on the Official Nigeria Top 100 and went Platinum in Nigeria.",
    evidenceLevel: "chart record",
    source: source.turntableDavido,
  },
  {
    id: "davido-with-you",
    title: "With You",
    artist: "Davido",
    year: 2025,
    role: "Co-lead",
    milestone: "Reached No. 1 on the Official Nigeria Top 100.",
    evidenceLevel: "chart record",
    source: source.turntableDavido,
  },
  {
    id: "neutral-the-money",
    title: "The Money",
    artist: "Neutral",
    year: 2017,
    role: "Feature",
    milestone: "A shared Davido × Olamide record retained as a neutral catalogue reference, never a ballot entry.",
    evidenceLevel: "catalogue context",
    source: source.davidoCatalog,
  },
];

export const battleRounds: BattleRound[] = [
  {
    id: "round-01",
    number: "01 / 05",
    title: "THE IGNITION",
    lens: "early breakout",
    prompt: "Which opening statement would you still defend without a speaker?",
    olamideSongId: "olamide-eni-duro",
    davidoSongId: "davido-dami-duro",
  },
  {
    id: "round-02",
    number: "02 / 05",
    title: "THE DANCEFLOOR",
    lens: "2013 energy",
    prompt: "Two different ways to own a room. Which one takes this moment?",
    olamideSongId: "olamide-durosoke",
    davidoSongId: "davido-skelewu",
  },
  {
    id: "round-03",
    number: "03 / 05",
    title: "THE PHRASE",
    lens: "culture in a hook",
    prompt: "Which record became a sentence people carried outside the song?",
    olamideSongId: "olamide-who-you-epp",
    davidoSongId: "davido-if",
  },
  {
    id: "round-04",
    number: "04 / 05",
    title: "THE RETURN",
    lens: "2020 reset",
    prompt: "Which 2020 record had the room moving on first listen?",
    olamideSongId: "olamide-loading",
    davidoSongId: "davido-fem",
  },
  {
    id: "round-05",
    number: "05 / 05",
    title: "THE NEXT WAVE",
    lens: "new-school bridge",
    prompt: "Which collaboration best proves a catalogue can keep becoming?",
    olamideSongId: "olamide-amapiano",
    davidoSongId: "davido-unavailable",
  },
];

export const currentRound = battleRounds[0];

export function getSong(songId: string) {
  const song = songs.find((entry) => entry.id === songId);

  if (!song) {
    throw new Error(`Song not found: ${songId}`);
  }

  return song;
}

export const catalogueByArtist = (artist: Artist) =>
  songs.filter((song) => song.artist === artist);
