# BEAT BALLOT

**The songs. The moment. Your ballot.**

Beat Ballot is an independent cultural game around the Olamide vs Davido hit-for-hit conversation in Nigeria. It is not an official artist battle and is not affiliated with, endorsed by, or speaking for either artist, their labels or teams. Built by Mojeeb Titilayo / BlindspotLab.

Live domain: [beatballot.space](https://beatballot.space)

## Stack and integrity

- Next.js 16 App Router
- Neon Postgres via `@neondatabase/serverless`
- Neon Managed Better Auth (Better Auth-powered) via `@neondatabase/auth`
- No client-side vote authority or anonymous voting

Postgres owns the integrity boundary: `votes` has a unique `(user_id, round_id)` constraint; the `cast_ballot_vote` database function checks the active matchup, performs an HMAC-hashed request/IP throttle, creates the immutable vote and safe public event, and awards exactly one point. The browser never submits a score, identity or total.

## Neon dashboard configuration

1. In the Beat Ballot Neon project, enable **Neon Auth** (the current Managed Better Auth service, not a legacy external-provider setup).
2. In Neon Auth, enable only the sign-in methods you intend fans to use. The included auth surface reads the managed configuration; it does not add providers or send email itself.
3. Add `https://beatballot.space` as an allowed application/origin URL in Neon Auth. Add the local development URL only for development.
4. Copy the branch’s Postgres connection string into `DATABASE_URL` and the branch’s Managed Auth endpoint into `NEON_AUTH_BASE_URL`.

Neon Auth stores its own users and sessions in `neon_auth.*`. Beat Ballot migrations only create application tables in `public`; they do not alter the Neon Auth schema or unrelated database data.

## Environment

```bash
cp .env.example .env.local
```

Set the two Neon values described above. Then generate the required stable cookie-signing secret locally:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Write that output to `NEON_AUTH_COOKIE_SECRET` in `.env.local`. It must be at least 32 characters, remain stable for each deployment environment, and must never be committed. The repository’s `.env.local` is ignored.

## Database setup

Run these commands only against the intended Beat Ballot Neon branch:

```bash
npm install
npm run db:migrate
npm run db:seed
```

`db:migrate` records applied versioned SQL in `beat_ballot_migrations`. `db:seed` is idempotent: it upserts the catalogue and all five Season 01 rounds from `data/ballot.ts`. Round 01 is seeded as the single active round; later rounds remain stored but closed until an intentional editorial update. The shared record `The Money` is seeded as a neutral, catalogue-only feature and is never eligible for either artist.

## Develop and verify

```bash
npm run dev
npm test
npm run lint
npm run build
npm audit --omit=dev
```

Open [http://localhost:3000](http://localhost:3000). Use a Neon Auth method that is configured in your dashboard. A first session must claim a unique 3–24 character fan alias before casting a ballot. The `/fan` route is middleware-protected; all data-changing routes re-check the authenticated session server-side.

For a manual launch pass, verify:

1. unauthenticated `/fan` redirects to sign-in and unauthenticated vote requests return `401`;
2. an authenticated user can claim an alias once; duplicate aliases return `409`;
3. their first valid vote returns `201`; a second vote in the same round returns `409`;
4. results and leaderboard are `null` before a fan has voted, then appear after that fan’s valid vote;
5. the safe `Last 10 picks` feed shows only alias, artist, song and relative time and refreshes every 12 seconds.

## Deployment

Set `DATABASE_URL`, `NEON_AUTH_BASE_URL`, and the same `NEON_AUTH_COOKIE_SECRET` in the production host. Build with `npm run build`. Do not deploy until the Neon Auth allowed origin contains `https://beatballot.space` and the database migration + seed have completed successfully.

## Editorial rules

1. Primary ballot rounds are lead/co-lead songs only.
2. Features and remixes are catalogue records, not primary ballot choices.
3. `The Money` remains neutral and never awards either artist.
4. Results stay sealed until a fan casts a verified ballot.
5. Each catalogue record retains a year, credited role, modest milestone, evidence level and external source link. No copyrighted audio, lyrics or artwork are hosted here.

Research and sources are recorded in [docs/research.md](docs/research.md).
