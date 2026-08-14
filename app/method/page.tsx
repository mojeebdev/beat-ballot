import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial-shell";

export const metadata: Metadata = {
  title: "Method & About | Beat Ballot",
  description: "How Beat Ballot frames its independent, fan-led Nigerian music-culture ballot.",
  alternates: { canonical: "/method" },
};

const principles = [
  ["01", "Match context, not hype.", "Rounds pair records by era, credited role and cultural job—not a made-up universal score."],
  ["02", "Features have their own shelf.", "Main voting contains lead and co-lead songs only. Features and shared records remain visible in the research index."],
  ["03", "Every record leaves a trail.", "Each entry shows its year, credited role, evidence level, brief context and an external source."],
  ["04", "A pick earns the reveal.", "Current-round pace and fan points stay sealed until a signed-in fan casts a verified ballot."],
];

export default function MethodPage() {
  return (
    <EditorialShell>
      <section className="editorial-hero editorial-hero--method">
        <p className="section-label">BB / METHOD / ABOUT</p>
        <h1>THE<br /><em>RECEIPTS.</em></h1>
        <p>Beat Ballot gives a live music argument enough structure to remain a cultural game: legible sources, clear limits and one verified pick per round.</p>
        <Link className="arrow-action" href="/#arena">ENTER THE ARENA <span>↓</span></Link>
      </section>
      <section className="method-page">
        <div><p className="section-label">THE RULES OF THE ROOM</p><h2>Built to keep the argument honest.</h2></div>
        <div className="method-page__rules">
          {principles.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>
      <section className="faq-page">
        <p className="section-label">PLAIN ANSWERS</p>
        <h2>What Beat Ballot is—and is not.</h2>
        <dl>
          <div><dt>Is Beat Ballot an official artist battle?</dt><dd>No. Beat Ballot is an independent cultural experiment. It is not affiliated with, endorsed by, or speaking for Olamide, Davido, their labels or teams.</dd></div>
          <div><dt>Who can vote?</dt><dd>Authenticated fans with a unique public alias. There is one verified vote per fan, per round.</dd></div>
          <div><dt>Does a vote change an artist&apos;s standing?</dt><dd>No. A vote only affects the game&apos;s current round pace and the participating fan&apos;s points. It makes no claim about an artist&apos;s career, popularity or official ranking.</dd></div>
          <div><dt>Who built it?</dt><dd>Beat Ballot was built by Mojeeb Titilayo as a BlindspotLab experiment at the intersection of culture, product and participation.</dd></div>
        </dl>
      </section>
    </EditorialShell>
  );
}
