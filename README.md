# BEAT BALLOT

**The songs. The moment. Your ballot.**

Beat Ballot is an independent, fan-led cultural experiment for the Olamide and Davido hit-for-hit conversation. It does **not** represent an official battle and is not affiliated with either artist, their labels or teams.

Live domain: [beatballot.space](https://beatballot.space)

## What is in this first commit

- A responsive Next.js public experience with a deliberately neutral voting frame.
- Season 01 pairing structure, public method, artist context and a sourced research index.
- An honest local preview interaction: it stores one test pick on the current device and never pretends it is a public vote.
- JSON-LD identity for the project, BlindspotLab and Mojeeb Titilayo.
- Environment boundaries for the Neon launch integration.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production backend decision

The recommended launch stack is **Neon Postgres + Neon Managed Better Auth**.

Why this fit:

- one home for application data, users and sessions; no Clerk dashboard;
- relational constraints can enforce one ballot per authenticated user per round;
- a server-side vote route can keep scoring and fan XP out of the browser;
- the “last ten” feed can use light polling in v1, avoiding another real-time platform for a single small surface.

The public app intentionally remains in `preview` mode until a Neon project and authentication configuration are enabled. The current commit does not create a Neon project, send email, add secrets or write to any production database.

When approved for the backend pass, the minimum data model is:

| Table | Purpose | Integrity rule |
| --- | --- | --- |
| `profiles` | public fan alias and calculated XP | one profile per authenticated user |
| `rounds` | ballot timing and rules | one active round at a time |
| `songs` | sourced song metadata | song belongs to exactly one artist and role |
| `votes` | immutable fan ballot | unique `(user_id, round_id)` |
| `vote_events` | last-ten public feed | emits only consent-safe alias/pick data |

Before turning on the public ballot, add server-enforced rate limiting and a bot challenge on the sign-in/vote path. The database constraint remains the final duplicate-vote protection.

## Editorial rules

1. The primary ballot is for lead and co-lead records only.
2. Features, remixes and shared records are retained for a separately labelled Feature Hall.
3. `The Money` (Davido × Olamide) is neutral and does not count for either side.
4. A fan sees public round pace only after submitting a ballot.
5. Every song card carries year, credited role, context and a source link; no opaque “hit score” is used.

Research and sources are recorded in [docs/research.md](docs/research.md).

## Build notes

The visual system draws from the BlindspotLab signature: void-green field, paper and solar-gold contrast, editorial serif display type, monospace metadata, directional asymmetry and no generic dashboard treatment.

## Creator

Built by **Mojeeb Titilayo**, Product Engineer & Strategist, as a **BlindspotLab** experiment.
