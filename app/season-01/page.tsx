import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial-shell";
import { battleRounds, getSong } from "@/data/ballot";

export const metadata: Metadata = {
  title: "Season 01 | Beat Ballot",
  description: "The five sourced Olamide and Davido matchups in Beat Ballot Season 01.",
  alternates: { canonical: "/season-01" },
};

export default function SeasonOnePage() {
  return (
    <EditorialShell>
      <section className="editorial-hero editorial-hero--season">
        <p className="section-label">BB / SEASON 01 / FIVE ROUNDS</p>
        <h1>THE<br /><em>SEASON.</em></h1>
        <p>Five cultural lenses. Ten lead or co-lead records. No claimed universal winner—just a clear, sourced prompt for each round.</p>
        <Link className="arrow-action" href="/#arena">CAST A VERIFIED PICK <span>↓</span></Link>
      </section>
      <section className="round-index" aria-label="Season 01 matchups">
        {battleRounds.map((round) => {
          const olamide = getSong(round.olamideSongId);
          const davido = getSong(round.davidoSongId);
          return <article key={round.id} className="round-index__item">
            <p className="section-label">ROUND {round.number} / {round.lens.toUpperCase()}</p>
            <h2>{round.title}</h2>
            <p className="round-index__prompt">{round.prompt}</p>
            <div className="round-index__songs">
              <a href={olamide.source.url} target="_blank" rel="noreferrer"><span>OLAMIDE / {olamide.year}</span><strong>{olamide.title}</strong><small>{olamide.role} / {olamide.evidenceLevel} ↗</small></a>
              <span className="round-index__versus">VS</span>
              <a href={davido.source.url} target="_blank" rel="noreferrer"><span>DAVIDO / {davido.year}</span><strong>{davido.title}</strong><small>{davido.role} / {davido.evidenceLevel} ↗</small></a>
            </div>
          </article>;
        })}
      </section>
    </EditorialShell>
  );
}
