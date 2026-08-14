-- Beat Ballot application tables only. Neon Managed Better Auth owns neon_auth.*.
CREATE TABLE IF NOT EXISTS profiles (
  user_id TEXT PRIMARY KEY,
  alias VARCHAR(24) NOT NULL,
  points INTEGER NOT NULL DEFAULT 0 CHECK (points >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS profiles_alias_lower_key ON profiles (lower(alias));

CREATE TABLE IF NOT EXISTS songs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL CHECK (artist IN ('Olamide', 'Davido', 'Neutral')),
  release_year INTEGER NOT NULL CHECK (release_year BETWEEN 1900 AND 2100),
  credited_role TEXT NOT NULL CHECK (credited_role IN ('Lead', 'Co-lead', 'Feature')),
  milestone TEXT NOT NULL,
  evidence_level TEXT NOT NULL CHECK (evidence_level IN ('chart record', 'catalogue context', 'cultural marker')),
  source_label TEXT NOT NULL,
  source_url TEXT NOT NULL,
  main_ballot_eligible BOOLEAN NOT NULL DEFAULT false,
  neutral BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (NOT neutral OR NOT main_ballot_eligible)
);

CREATE TABLE IF NOT EXISTS rounds (
  id TEXT PRIMARY KEY,
  number SMALLINT NOT NULL UNIQUE CHECK (number BETWEEN 1 AND 99),
  title TEXT NOT NULL,
  lens TEXT NOT NULL,
  prompt TEXT NOT NULL,
  olamide_song_id TEXT NOT NULL REFERENCES songs(id),
  davido_song_id TEXT NOT NULL REFERENCES songs(id),
  opens_at TIMESTAMPTZ NOT NULL,
  closes_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  CHECK (opens_at < closes_at),
  CHECK (olamide_song_id <> davido_song_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS one_active_round ON rounds (is_active) WHERE is_active;

CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  round_id TEXT NOT NULL REFERENCES rounds(id),
  song_id TEXT NOT NULL REFERENCES songs(id),
  points_earned SMALLINT NOT NULL DEFAULT 1 CHECK (points_earned = 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, round_id)
);

CREATE INDEX IF NOT EXISTS votes_round_song_idx ON votes (round_id, song_id);

CREATE TABLE IF NOT EXISTS public_vote_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vote_id UUID NOT NULL UNIQUE REFERENCES votes(id) ON DELETE CASCADE,
  alias VARCHAR(24) NOT NULL,
  song_id TEXT NOT NULL REFERENCES songs(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS public_vote_events_created_at_idx ON public_vote_events (created_at DESC);

-- A HMAC request/IP digest is the only network identifier retained for voting throttles.
CREATE TABLE IF NOT EXISTS vote_request_limits (
  request_hash CHAR(64) PRIMARY KEY,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION cast_ballot_vote(
  p_user_id TEXT,
  p_round_id TEXT,
  p_song_id TEXT,
  p_request_hash CHAR(64)
) RETURNS TABLE(vote_id UUID) LANGUAGE plpgsql AS $$
DECLARE
  current_round rounds%ROWTYPE;
  current_alias VARCHAR(24);
  inserted_vote UUID;
  accepted_limit CHAR(64);
BEGIN
  SELECT alias INTO current_alias FROM profiles WHERE user_id = p_user_id;
  IF current_alias IS NULL THEN RAISE EXCEPTION 'BB_ALIAS_REQUIRED'; END IF;

  SELECT * INTO current_round FROM rounds
  WHERE id = p_round_id AND is_active = true AND opens_at <= now() AND closes_at > now();
  IF NOT FOUND THEN RAISE EXCEPTION 'BB_ROUND_CLOSED'; END IF;
  IF p_song_id <> current_round.olamide_song_id AND p_song_id <> current_round.davido_song_id THEN
    RAISE EXCEPTION 'BB_INVALID_BALLOT';
  END IF;

  INSERT INTO vote_request_limits (request_hash, last_seen_at)
  VALUES (p_request_hash, now())
  ON CONFLICT (request_hash) DO UPDATE SET last_seen_at = EXCLUDED.last_seen_at
  WHERE vote_request_limits.last_seen_at <= now() - interval '8 seconds'
  RETURNING request_hash INTO accepted_limit;
  IF accepted_limit IS NULL THEN RAISE EXCEPTION 'BB_RATE_LIMITED'; END IF;

  BEGIN
    INSERT INTO votes (user_id, round_id, song_id) VALUES (p_user_id, p_round_id, p_song_id)
    RETURNING id INTO inserted_vote;
  EXCEPTION WHEN unique_violation THEN
    RAISE EXCEPTION 'BB_DUPLICATE_VOTE';
  END;

  UPDATE profiles SET points = points + 1 WHERE user_id = p_user_id;
  INSERT INTO public_vote_events (vote_id, alias, song_id) VALUES (inserted_vote, current_alias, p_song_id);
  RETURN QUERY SELECT inserted_vote;
END;
$$;
