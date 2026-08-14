"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { battleRounds, currentRound, getSong, songs, type Artist, type BattleRound, type Song } from "@/data/ballot";
import { MobileNav } from "@/components/mobile-nav";

type VoteEvent = { id: string; alias: string; artist: string; title: string; created_at: string };
type Result = { song_id: string; title: string; artist: string; votes: number };
type Leader = { alias: string; points: number };
type GameError = { error?: string; code?: string };
type Game = {
  round: { id: string; number: number; title: string; lens: string; prompt: string; olamide_song_id: string; davido_song_id: string };
  viewer: { signedIn: boolean; alias: string | null; hasVoted: boolean };
  events: VoteEvent[];
  results: Result[] | null;
  leaderboard: Leader[] | null;
};

const siteUrl = "https://beatballot.space";
const capacityProtectionCode = "CAPACITY_PROTECTION";
const capacityProtectionNotice = "THE ROOM IS BUSY. WE'RE PROTECTING THE TALLY. TRY AGAIN SHORTLY.";
const tallyUnavailableNotice = "THE LIVE TAPE IS TEMPORARILY UNAVAILABLE. TRY AGAIN SHORTLY.";
const homeLinks = [
  { href: "#arena", label: "ARENA" },
  { href: "/season-01", label: "SEASON" },
  { href: "/catalogue", label: "INDEX" },
  { href: "/method", label: "METHOD" },
];

function xShareUrl(text: string) {
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}`;
}

const artistNotes: Record<Exclude<Artist, "Neutral">, string> = {
  Olamide: "A rapper, songwriter and label leader whose catalogue continuously connects Yoruba rap, street-pop and new-school collaborations.",
  Davido: "A singer and songwriter whose catalogue has moved from early Afropop breakout records to enduring global crossover moments.",
};

function ArtistMark({ artist }: { artist: Artist }) {
  return <span className={`artist-mark artist-mark--${artist.toLowerCase()}`} aria-hidden="true">{artist === "Olamide" ? "O" : artist === "Davido" ? "D" : "N"}</span>;
}

function relativeTime(value: string) {
  const minutes = Math.floor(Math.max(0, Date.now() - new Date(value).getTime()) / 60_000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
}

function SongCard({ song, disabled, onPick }: { song: Song; disabled: boolean; onPick: (song: Song) => void }) {
  return (
    <article className={`song-card song-card--${song.artist.toLowerCase()} ${disabled ? "is-selected" : ""}`}>
      <div className="song-card__topline"><span>{song.artist}</span><span>{song.year}</span></div>
      <div className="song-card__title-wrap"><ArtistMark artist={song.artist} /><h3>{song.title}</h3></div>
      <p>{song.milestone}</p>
      <div className="song-card__footer"><span className="data-chip">{song.role}</span><a href={song.source.url} target="_blank" rel="noreferrer">Source ↗</a></div>
      <button className="pick-button" type="button" onClick={() => onPick(song)} disabled={disabled}>
        {disabled ? "YOUR BALLOT / SEALED" : `PICK ${song.title.toUpperCase()}`}
      </button>
    </article>
  );
}

function RollingPicks({ events }: { events: VoteEvent[] }) {
  return <section className="rolling-picks" aria-label="Latest verified ballot picks">
    <div className="section-label"><span className="live-dot" />LAST 10 PICKS</div>
    <div className="rolling-picks__viewport">
      {events.length ? events.map((event) => <div className="pick-event" key={event.id}>
        <span>{event.alias.toUpperCase()} PICKED {event.title.toUpperCase()}</span>
        <small>{event.artist.toUpperCase()} / {relativeTime(event.created_at)}</small>
      </div>) : <div className="pick-event pick-event--empty"><span>THE TAPE IS WAITING FOR THE FIRST BALLOT.</span><small>NO FAKE ACTIVITY HERE</small></div>}
    </div>
    <p className="microcopy">Verified public picks refresh every 12 seconds. No emails, no invented activity.</p>
  </section>;
}

function ResultsPanel({ game }: { game: Game | null }) {
  const isOpen = Boolean(game?.viewer.hasVoted && game.results);
  return <section className="results-panel" id="leaderboard">
    <div className="section-label">ROUND {String(game?.round.number ?? 1).padStart(2, "0")} / SONG PACE</div>
    <div className="results-panel__intro"><h2>Let the room speak.</h2><p>{isOpen ? "Your verified ballot opened the room. Pace and fan points update on a short live interval." : "The current round stays sealed until you cast a verified ballot."}</p></div>
    {isOpen ? <>
      <ol className="result-list result-list--open">{game!.results!.map((result, index) => <li key={result.song_id}><span className="result-rank">0{index + 1}</span><span className="result-song">{result.title}</span><span className="result-artist">{result.artist}</span><span className="result-score">{String(result.votes).padStart(2, "0")}</span></li>)}</ol>
      <div className="fan-pace"><span>FAN LEADERBOARD</span><p>{game!.leaderboard!.length ? game!.leaderboard!.slice(0, 3).map((leader) => `${leader.alias.toUpperCase()} / ${leader.points}`).join(" · ") : "FIRST VERIFIED PICK SETS THE PACE"}</p></div>
    </> : <><ol className="result-list">{["PACE SEALED", "FAN POINTS SEALED"].map((label, index) => <li key={label}><span className="result-rank">0{index + 1}</span><span className="result-song">{label}</span><span className="result-artist">—</span><span className="result-score">—</span></li>)}</ol><div className="fan-pace"><span>FAN PACE</span><p>SIGN IN, PICK ONCE, THEN SEE THE ROOM</p></div></>}
  </section>;
}

function Catalogue() {
  const [artist, setArtist] = useState<Artist | "All">("All");
  const [era, setEra] = useState("All");
  const visible = useMemo(() => songs.filter((song) => (artist === "All" || song.artist === artist) && (era === "All" || `${Math.floor(song.year / 5) * 5}` === era)), [artist, era]);
  const eras = [...new Set(songs.map((song) => `${Math.floor(song.year / 5) * 5}`))].sort();
  return <section className="catalogue" id="catalogue">
    <div className="catalogue__intro"><p className="section-label">THE INDEX / RESEARCHED, NOT RANKED</p><h2>Catalogue before combat.</h2><p>Every record keeps its year, credited role, milestone, evidence level and an external source. Features and shared records are catalogue-only.</p></div>
    <div className="catalogue-filters" aria-label="Catalogue filters"><label>ARTIST<select value={artist} onChange={(event) => setArtist(event.target.value as Artist | "All")}><option>All</option><option>Olamide</option><option>Davido</option><option>Neutral</option></select></label><label>ERA<select value={era} onChange={(event) => setEra(event.target.value)}><option>All</option>{eras.map((value) => <option key={value} value={value}>{value}–{Number(value) + 4}</option>)}</select></label><span>{visible.length} FILED</span></div>
    <ol className="catalogue-records">{visible.map((song) => <li key={song.id}><span>{song.year}</span><div><strong>{song.title}</strong><small>{song.artist} / {song.role} / {song.evidenceLevel}</small><p>{song.milestone}</p></div><a href={song.source.url} target="_blank" rel="noreferrer" aria-label={`Read source for ${song.title}`}>SOURCE ↗</a></li>)}</ol>
  </section>;
}

function BulletinTape() {
  return <div className="bulletin-tape" aria-hidden="true"><span>LIVE BALLOT</span><span>ONE PICK PER ROUND</span><span>UNAFFILIATED</span></div>;
}

function RecordIndexArt() {
  return <div className="record-index-art" aria-hidden="true"><Image className="record-index-art__vinyl" src="/hero/vinyl-record.webp" alt="" fill priority sizes="(max-width: 760px) 190px, (max-width: 1100px) 46vw, 640px" /></div>;
}

export function BallotExperience() {
  const router = useRouter();
  const [game, setGame] = useState<Game | null>(null);
  const [notice, setNotice] = useState("ONE VERIFIED BALLOT PER ROUND.");
  const [loading, setLoading] = useState(true);
  const [tallyState, setTallyState] = useState<"live" | "capacity" | "paused">("live");
  const [aliasOpen, setAliasOpen] = useState(false);
  const [alias, setAlias] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadGame = useCallback(async () => {
    try {
      const response = await fetch("/api/game", { cache: "no-store" });
      const data = await response.json().catch(() => ({})) as Game | GameError;
      if (!response.ok) {
        if ((data as GameError).code === "ROUND_UNAVAILABLE") {
          setTallyState("paused");
          setNotice("NO LIVE ROUND IS OPEN. CHECK THE SEASON REEL FOR WHAT'S NEXT.");
          return;
        }
        if ((data as GameError).code === capacityProtectionCode) {
          setTallyState("capacity");
          setNotice(capacityProtectionNotice);
          return;
        }
        setTallyState("live");
        setNotice(tallyUnavailableNotice);
        return;
      }
      setGame(data as Game);
      setTallyState("live");
      setNotice((currentNotice) => currentNotice === capacityProtectionNotice ? "THE LIVE TAPE IS BACK. THE ROOM IS OPEN." : currentNotice);
    } catch {
      setTallyState("live");
      setNotice(tallyUnavailableNotice);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void loadGame(), 0);
    const interval = window.setInterval(() => void loadGame(), 12_000);
    return () => { window.clearTimeout(initial); window.clearInterval(interval); };
  }, [loadGame]);

  const round: BattleRound = useMemo(() => {
    const live = game ? battleRounds.find((entry) => entry.id === game.round.id) : undefined;
    return live ?? currentRound;
  }, [game]);

  async function saveAlias(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true);
    try {
      const response = await fetch("/api/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alias }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not save alias.");
      setAliasOpen(false); setNotice("FAN ALIAS SEALED. NOW MAKE YOUR PICK."); await loadGame();
    } catch (error) { setNotice(error instanceof Error ? error.message.toUpperCase() : "COULD NOT SAVE YOUR ALIAS."); } finally { setSubmitting(false); }
  }

  async function handlePick(song: Song) {
    if (!game?.viewer.signedIn) { router.push(`/auth/sign-in?returnTo=${encodeURIComponent("/#arena")}`); return; }
    if (!game.viewer.alias) { setAliasOpen(true); return; }
    if (game.viewer.hasVoted) { setNotice("ONE VERIFIED PICK PER ROUND. YOUR BALLOT IS SEALED."); return; }
    setSubmitting(true); setNotice("SEALING YOUR VERIFIED BALLOT…");
    try {
      const response = await fetch("/api/vote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roundId: round.id, songId: song.id }) });
      const data = await response.json() as GameError;
      if (!response.ok) {
        if (data.code === capacityProtectionCode) {
          setTallyState("capacity");
          setNotice(capacityProtectionNotice);
          return;
        }
        throw new Error(data.error || "Could not record your ballot.");
      }
      setNotice(`${song.title.toUpperCase()} IS ON THE TAPE. THE ROOM IS OPEN.`); await loadGame();
    } catch (error) { setNotice(error instanceof Error ? error.message.toUpperCase() : "THE BALLOT COULD NOT BE RECORDED."); } finally { setSubmitting(false); }
  }

  async function signOut() { await authClient.signOut(); router.push("/"); router.refresh(); }
  async function shareBallot(text: string) {
    const payload = { title: "Beat Ballot — Hit for Hit", text, url: siteUrl };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${siteUrl}`);
      setNotice("THE LINK IS COPIED. SEND THE ROOM IN.");
    } catch {
      setNotice("SHARE THIS LINK: BEATBALLOT.SPACE");
    }
  }
  const headerStatus = loading
    ? "LOADING LIVE TAPE"
    : tallyState === "capacity"
      ? "TALLY PROTECTION ACTIVE"
      : tallyState === "paused"
        ? "NO LIVE ROUND"
        : `ROUND ${String(game?.round.number ?? 1).padStart(2, "0")} OPEN`;
  const shareText = `I just cast my Beat Ballot for ${round.title}. The songs. The moment. Your ballot.`;

  return <main>
    <div className="noise" aria-hidden="true" />
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Beat Ballot home">BEAT<br />BALLOT<span>.</span></a><div className="header-status"><span className="status-led" /><span>{headerStatus}</span></div><nav aria-label="Primary navigation"><a href="#arena">ARENA</a><Link href="/season-01">SEASON</Link><Link href="/catalogue">INDEX</Link><Link href="/method">METHOD</Link>{game?.viewer.signedIn ? <button className="nav-button" onClick={() => void signOut()}>SIGN OUT</button> : <Link href="/auth/sign-in?returnTo=/#arena">SIGN IN</Link>}</nav><MobileNav items={homeLinks} signedIn={Boolean(game?.viewer.signedIn)} onSignOut={() => void signOut()} /></header>
    <section className="hero" id="top">
      <RecordIndexArt />
      <div className="hero__meta"><span>NIGERIA / 2026</span><span>SEASON 01</span></div>
      <p className="kicker">A FAN-LED CULTURAL EXPERIMENT</p>
      <h1><span className="hero-word">HIT</span><span className="hero-slash">{"//"}</span><span className="hero-word">FOR</span><span className="hero-slash">{"//"}</span><span className="hero-word">HIT</span></h1>
      <div className="hero__proof"><span>THE CULTURE VOTES.</span><strong>ONE PICK.<br />REAL IMPACT.<br />EVERY ROUND.</strong><small>NOT AN OFFICIAL<br />ARTIST BATTLE.</small></div>
      <BulletinTape />
      <div className="hero__actions hero__actions--landing"><a className="arrow-action" href="#arena">CAST YOUR PICK <span>↓</span></a></div>
      <div className="hero__scoreline"><div><span>01</span> OLAMIDE</div><span className="scoreline-vs">VS</span><div>DAVIDO <span>02</span></div></div>
    </section>
    <section className="statement-strip"><span>NO INDUSTRY PANEL.</span><span>NO FAN-WAR ALGORITHM.</span><span>JUST RECEIPTS, CONTEXT &amp; YOUR PICK.</span></section>
    <section className="arena" id="arena"><div className="arena__heading"><div><p className="section-label">CURRENT BALLOT / {String(game?.round.number ?? 1).padStart(2, "0")} / 05</p><h2>{game?.round.title ?? round.title}</h2></div><div className="arena__prompt"><span>{game?.round.lens ?? round.lens}</span><p>{game?.round.prompt ?? round.prompt}</p></div></div><div className="song-grid"><SongCard song={getSong(round.olamideSongId)} disabled={submitting || Boolean(game?.viewer.hasVoted)} onPick={handlePick} /><div className="versus-lockup" aria-hidden="true"><span>HIT</span><strong>VS</strong><span>HIT</span></div><SongCard song={getSong(round.davidoSongId)} disabled={submitting || Boolean(game?.viewer.hasVoted)} onPick={handlePick} /></div><div className="ballot-notice" role="status"><span className="status-led" />{notice}</div>{tallyState === "capacity" ? <div className="traffic-notice" role="status"><span className="status-led" /><p>THE ROOM IS BUSY. WE&apos;RE PROTECTING THE TALLY WHILE IT RECOVERS.</p><button onClick={() => void loadGame()} type="button">RETRY NOW ↗</button></div> : null}{game?.viewer.hasVoted ? <div className="share-tools share-tools--after"><a target="_blank" rel="noreferrer" href={xShareUrl(shareText)}>SHARE YOUR PICK ON X ↗</a><button onClick={() => void shareBallot(shareText)} type="button">SHARE YOUR PICK ↗</button></div> : null}{aliasOpen ? <form className="alias-form" onSubmit={saveAlias}><label htmlFor="fan-alias">CLAIM A PUBLIC FAN ALIAS <input id="fan-alias" value={alias} onChange={(event) => setAlias(event.target.value)} minLength={3} maxLength={24} required autoFocus placeholder="e.g. LAGOS TAPE" /></label><button className="pick-button" disabled={submitting}>SAVE ALIAS →</button></form> : null}</section>
    <section className="signal-grid"><RollingPicks events={game?.events ?? []} /><ResultsPanel game={game} /></section>
    <section className="method" id="method"><div className="method__lead"><p className="section-label">THE RECEIPTS</p><h2>Built to keep the argument honest.</h2></div><div className="method__rules"><article><span>01</span><h3>Match context, not hype.</h3><p>Rounds pair records by era, role and cultural job — not a made-up universal score.</p></article><article><span>02</span><h3>Features live in their own room.</h3><p>The main ballot counts lead and co-lead songs only. Features are retained as catalogue records, not main votes.</p></article><article><span>03</span><h3>Every song has a trail.</h3><p>Each index entry carries its year, credited role and a link to the source behind its context.</p></article><article><span>04</span><h3>Your pick earns the reveal.</h3><p>Public pace stays sealed before a verified vote, so the room does not choose for you.</p></article></div></section>
    <Catalogue />
    <section className="about"><div className="about__sticker">AN INDEPENDENT<br />CULTURAL EXPERIMENT</div><div className="about__copy"><p className="section-label">ABOUT THE PROJECT</p><h2>The conversation had a pulse. We gave it a fair ballot.</h2><p>Beat Ballot was made for fans who care enough to bring a record, a memory and a reason. It is not affiliated with, endorsed by, or speaking for Olamide, Davido, their labels or teams.</p><p>Built by <a className="inline-link" href="https://mojeeb.xyz" target="_blank" rel="noreferrer">Mojeeb Titilayo</a> — Product Engineer &amp; Strategist — as a BlindspotLab experiment at the intersection of culture, product and participation.</p><div className="about__links"><a className="text-link" href="https://blindspotlab.xyz" target="_blank" rel="noreferrer">BLINDSPOTLAB ↗</a><a className="text-link" href="https://x.com/MojeebMotion" target="_blank" rel="noreferrer">@MOJEEBMOTION ↗</a></div></div></section>
    <footer className="site-footer"><div><a className="wordmark wordmark--footer" href="#top">BEAT<br />BALLOT<span>.</span></a><p>THE SONGS. THE MOMENT. YOUR BALLOT.</p></div><div className="footer-meta"><span>© 2026 BEAT BALLOT</span><a href="https://blindspotlab.xyz" target="_blank" rel="noreferrer">BLINDSPOTLAB ↗</a><a href="https://mojeeb.xyz" target="_blank" rel="noreferrer">MOJEEB TITILAYO ↗</a><a href="https://x.com/MojeebMotion" target="_blank" rel="noreferrer">@MOJEEBMOTION ↗</a><a href="mailto:hello@mojeeb.xyz?subject=Beat%20Ballot%20marketing%20or%20promotion">MARKETING / PROMOTION ↗</a><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link><span>UNAFFILIATED WITH THE ARTISTS</span></div></footer>
  </main>;
}
