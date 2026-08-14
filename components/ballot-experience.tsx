"use client";

import { useEffect, useMemo, useState } from "react";
import {
  catalogueByArtist,
  currentRound,
  getSong,
  songs,
  type Artist,
  type Song,
} from "@/data/ballot";

type LocalPick = {
  id: string;
  songId: string;
  timestamp: number;
};

const ballotMode = process.env.NEXT_PUBLIC_BALLOT_MODE ?? "preview";

const artistNotes: Record<Artist, string> = {
  Olamide:
    "A rapper, songwriter and label leader whose catalogue continuously connects Yoruba rap, street-pop and new-school collaborations.",
  Davido:
    "A singer and songwriter whose catalogue has moved from early Afropop breakout records to enduring global crossover moments.",
};

function ArtistMark({ artist }: { artist: Artist }) {
  return (
    <span className={`artist-mark artist-mark--${artist.toLowerCase()}`} aria-hidden="true">
      {artist === "Olamide" ? "O" : "D"}
    </span>
  );
}

function SongCard({
  song,
  selected,
  onPick,
}: {
  song: Song;
  selected: boolean;
  onPick: (song: Song) => void;
}) {
  return (
    <article className={`song-card song-card--${song.artist.toLowerCase()} ${selected ? "is-selected" : ""}`}>
      <div className="song-card__topline">
        <span>{song.artist}</span>
        <span>{song.year}</span>
      </div>
      <div className="song-card__title-wrap">
        <ArtistMark artist={song.artist} />
        <h3>{song.title}</h3>
      </div>
      <p>{song.milestone}</p>
      <div className="song-card__footer">
        <span className="data-chip">{song.role}</span>
        <a href={song.source.url} target="_blank" rel="noreferrer">
          Source ↗
        </a>
      </div>
      <button
        className="pick-button"
        type="button"
        onClick={() => onPick(song)}
        aria-pressed={selected}
      >
        {selected ? "YOUR PICK / LOCKED" : `PICK ${song.title.toUpperCase()}`}
      </button>
    </article>
  );
}

function RollingPicks({ pickedSong }: { pickedSong: Song | null }) {
  const events = pickedSong
    ? [
        {
          label: `YOU PICKED ${pickedSong.title.toUpperCase()}`,
          artist: pickedSong.artist,
          time: "now",
        },
      ]
    : [];

  return (
    <section className="rolling-picks" aria-label="Latest ballot picks">
      <div className="section-label">
        <span className="live-dot" />
        LAST 10 PICKS
      </div>
      <div className="rolling-picks__viewport">
        {events.length ? (
          events.map((event) => (
            <div className="pick-event" key={`${event.artist}-${event.label}`}>
              <span>{event.label}</span>
              <small>
                {event.artist} / {event.time}
              </small>
            </div>
          ))
        ) : (
          <div className="pick-event pick-event--empty">
            <span>THE TAPE IS WAITING FOR THE FIRST BALLOT.</span>
            <small>NO FAKE ACTIVITY HERE</small>
          </div>
        )}
      </div>
      <p className="microcopy">
        In preview, only your device is recorded. Once live, this feed refreshes from verified public ballots.
      </p>
    </section>
  );
}

function LockedResults({ pickedSong }: { pickedSong: Song | null }) {
  const currentSongs = [
    getSong(currentRound.olamideSongId),
    getSong(currentRound.davidoSongId),
  ];

  return (
    <section className="results-panel" id="leaderboard">
      <div className="section-label">ROUND 01 / SONG PACE</div>
      <div className="results-panel__intro">
        <h2>Let the room speak.</h2>
        <p>
          {pickedSong
            ? "Your preview pick is sealed on this device. Verified public totals replace this state when the Neon ballot is switched on."
            : "The public pace stays sealed until a fan earns the right to see it. Pick a side, then see the room."}
        </p>
      </div>
      <ol className={`result-list ${pickedSong ? "result-list--open" : ""}`}>
        {currentSongs.map((song, index) => {
          const isSelected = song.id === pickedSong?.id;
          return (
            <li key={song.id}>
              <span className="result-rank">0{index + 1}</span>
              <span className="result-song">{song.title}</span>
              <span className="result-artist">{song.artist}</span>
              <span className="result-score">{isSelected ? "01" : pickedSong ? "00" : "—"}</span>
            </li>
          );
        })}
      </ol>
      <div className="fan-pace">
        <span>FAN PACE</span>
        <p>{pickedSong ? "YOU / 01 PICK / LOCAL PREVIEW" : "SIGN IN TO BUILD YOUR FAN RUN"}</p>
      </div>
    </section>
  );
}

function CatalogueColumn({ artist }: { artist: Artist }) {
  const artistSongs = catalogueByArtist(artist);
  const visibleSongs = artistSongs.slice(0, 9);

  return (
    <section className={`catalogue-column catalogue-column--${artist.toLowerCase()}`}>
      <div className="catalogue-heading">
        <ArtistMark artist={artist} />
        <div>
          <span className="section-label">CATALOGUE INDEX</span>
          <h3>{artist}</h3>
        </div>
        <span className="catalogue-total">{artistSongs.length} FILED</span>
      </div>
      <p className="catalogue-bio">{artistNotes[artist]}</p>
      <ol className="catalogue-list">
        {visibleSongs.map((song) => (
          <li key={song.id}>
            <span>{song.year}</span>
            <div>
              <strong>{song.title}</strong>
              <small>{song.evidenceLevel}</small>
            </div>
            <a
              href={song.source.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read source for ${song.title}`}
            >
              ↗
            </a>
          </li>
        ))}
      </ol>
      <p className="catalogue-more">+ {artistSongs.length - visibleSongs.length} more records are in the research ledger.</p>
    </section>
  );
}

export function BallotExperience() {
  const [pick, setPick] = useState<LocalPick | null>(null);
  const [notice, setNotice] = useState("ONE VERIFIED BALLOT PER ROUND.");

  const pickedSong = useMemo(
    () => (pick ? songs.find((song) => song.id === pick.songId) ?? null : null),
    [pick],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("beat-ballot-preview-pick");

    if (!saved) return;

    let frame: number | undefined;

    try {
      const parsed = JSON.parse(saved) as LocalPick;
      if (parsed.id === currentRound.id && songs.some((song) => song.id === parsed.songId)) {
        frame = window.requestAnimationFrame(() => {
          setPick(parsed);
          setNotice("YOUR PREVIEW PICK IS SEALED ON THIS DEVICE.");
        });
      }
    } catch {
      window.localStorage.removeItem("beat-ballot-preview-pick");
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function handlePick(song: Song) {
    if (pick) {
      setNotice("ONE PREVIEW PICK PER ROUND. RESET ARRIVES WITH THE NEXT ROUND.");
      return;
    }

    const nextPick = { id: currentRound.id, songId: song.id, timestamp: Date.now() };
    window.localStorage.setItem("beat-ballot-preview-pick", JSON.stringify(nextPick));
    setPick(nextPick);
    setNotice(`${song.title.toUpperCase()} IS YOUR PREVIEW PICK. THE TAPE MOVED.`);
  }

  function scrollToArena() {
    document.getElementById("arena")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Beat Ballot home">
          BEAT<br />BALLOT<span>.</span>
        </a>
        <div className="header-status">
          <span className="status-led" />
          <span>ROUND 01 OPEN</span>
        </div>
        <nav aria-label="Primary navigation">
          <a href="#arena">ARENA</a>
          <a href="#method">METHOD</a>
          <a href="#catalogue">INDEX</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__meta">
          <span>NIGERIA / 2026</span>
          <span>SEASON 01</span>
        </div>
        <p className="kicker">A FAN-LED CULTURAL EXPERIMENT</p>
        <h1>
          HIT<span>/</span>FOR<span>/</span>HIT
        </h1>
        <div className="hero__bottom">
          <p className="hero__statement">
            Two deep catalogues. No official fight. Just the songs people would go to war for.
          </p>
          <button className="arrow-action" type="button" onClick={scrollToArena}>
            ENTER THE BALLOT <span>↓</span>
          </button>
        </div>
        <div className="hero__scoreline" aria-label="Artist matchup">
          <div><span>01</span> OLAMIDE</div>
          <span className="scoreline-vs">VS</span>
          <div>DAVIDO <span>02</span></div>
        </div>
      </section>

      <section className="statement-strip">
        <span>NO INDUSTRY PANEL.</span>
        <span>NO FAN-WAR ALGORITHM.</span>
        <span>JUST RECEIPTS, CONTEXT &amp; YOUR PICK.</span>
      </section>

      <section className="arena" id="arena">
        <div className="arena__heading">
          <div>
            <p className="section-label">CURRENT BALLOT / {currentRound.number}</p>
            <h2>{currentRound.title}</h2>
          </div>
          <div className="arena__prompt">
            <span>{currentRound.lens}</span>
            <p>{currentRound.prompt}</p>
          </div>
        </div>

        <div className="song-grid">
          <SongCard
            song={getSong(currentRound.olamideSongId)}
            selected={pickedSong?.id === currentRound.olamideSongId}
            onPick={handlePick}
          />
          <div className="versus-lockup" aria-hidden="true">
            <span>HIT</span>
            <strong>VS</strong>
            <span>HIT</span>
          </div>
          <SongCard
            song={getSong(currentRound.davidoSongId)}
            selected={pickedSong?.id === currentRound.davidoSongId}
            onPick={handlePick}
          />
        </div>
        <div className="ballot-notice" role="status">
          <span className="status-led" />
          {notice}
          {ballotMode === "preview" ? <small>PREVIEW MODE</small> : null}
        </div>
      </section>

      <section className="signal-grid">
        <RollingPicks pickedSong={pickedSong} />
        <LockedResults pickedSong={pickedSong} />
      </section>

      <section className="method" id="method">
        <div className="method__lead">
          <p className="section-label">THE RECEIPTS</p>
          <h2>Built to keep the argument honest.</h2>
        </div>
        <div className="method__rules">
          <article>
            <span>01</span>
            <h3>Match context, not hype.</h3>
            <p>Rounds pair records by era, role and cultural job — not a made-up universal score.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Features live in their own room.</h3>
            <p>The main ballot counts lead and co-lead songs only. Features are kept for a separate Feature Hall.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Every song has a trail.</h3>
            <p>Each index entry carries its year, credited role and a link to the source behind its context.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Your pick earns the reveal.</h3>
            <p>Public pace stays sealed before a vote, so the room does not choose for you.</p>
          </article>
        </div>
      </section>

      <section className="catalogue" id="catalogue">
        <div className="catalogue__intro">
          <p className="section-label">THE INDEX / RESEARCHED, NOT RANKED</p>
          <h2>Catalogue before combat.</h2>
          <p>
            This is a living research ledger, not a claim that one artist’s history can be reduced to a number.
          </p>
        </div>
        <div className="catalogue__columns">
          <CatalogueColumn artist="Olamide" />
          <CatalogueColumn artist="Davido" />
        </div>
      </section>

      <section className="about">
        <div className="about__sticker">AN INDEPENDENT<br />CULTURAL EXPERIMENT</div>
        <div className="about__copy">
          <p className="section-label">ABOUT THE PROJECT</p>
          <h2>The conversation had a pulse. We gave it a fair ballot.</h2>
          <p>
            Beat Ballot was made for fans who care enough to bring a record, a memory and a reason. It is not affiliated with, endorsed by, or speaking for Olamide, Davido, their labels or teams.
          </p>
          <p>
            Built by Mojeeb Titilayo — Product Engineer &amp; Strategist — as a BlindspotLab experiment at the intersection of culture, product and participation.
          </p>
          <a className="text-link" href="https://blindspotlab.com" target="_blank" rel="noreferrer">
            BLINDSPOTLAB ↗
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <a className="wordmark wordmark--footer" href="#top">BEAT<br />BALLOT<span>.</span></a>
          <p>THE SONGS. THE MOMENT. YOUR BALLOT.</p>
        </div>
        <div className="footer-meta">
          <span>© 2026 BEAT BALLOT</span>
          <span>BLINDSPOTLAB / LAGOS</span>
          <span>UNAFFILIATED WITH THE ARTISTS</span>
        </div>
      </footer>
    </main>
  );
}
