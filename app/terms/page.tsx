import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial-shell";

export const metadata: Metadata = {
  title: "Terms | Beat Ballot",
  description: "The simple rules for taking part in Beat Ballot.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <EditorialShell>
      <section className="legal-page">
        <p className="section-label">BB / LEGAL / TERMS</p>
        <h1>THE RULES<br /><em>OF THE ROOM.</em></h1>
        <p className="legal-page__intro">Beat Ballot gives a music conversation a fairer format. These terms explain the conditions for using the site and casting a verified pick.</p>
        <p className="legal-page__updated">LAST UPDATED / 14 AUGUST 2026</p>

        <div className="legal-page__content">
          <article>
            <h2>Beat Ballot is independent</h2>
            <p>Beat Ballot is an independent cultural experiment by BlindspotLab. It is not affiliated with, endorsed by, or speaking for Olamide, Davido, their labels, teams, platforms or rights holders. A game result is not an official ranking, chart, award or statement about either artist&apos;s career.</p>
          </article>

          <article>
            <h2>One fan, one verified pick</h2>
            <p>You may cast one authenticated pick per open round. Do not use bots, scripts, duplicate accounts, shared credentials or other methods intended to manipulate a tally, evade a rate limit or interrupt the service. We may pause, reject or remove activity that compromises a fair ballot.</p>
          </article>

          <article>
            <h2>Your public alias</h2>
            <p>Your alias must not impersonate another person or organisation, include abusive or unlawful material, or infringe another party&apos;s rights. We may require an alias to be changed or remove it from public displays where it breaks these rules.</p>
          </article>

          <article>
            <h2>Availability and the live tally</h2>
            <p>The room can move quickly. We may slow, pause or temporarily limit access when necessary to protect the tally, security or reliability of the site. A temporary availability notice does not change a vote already recorded in the database.</p>
          </article>

          <article>
            <h2>Music, sources and sharing</h2>
            <p>Artists, song titles, names, logos and linked materials belong to their respective owners. Beat Ballot does not host copyrighted audio, lyrics or artist artwork. Source and social links take you to third-party services; use them under those services&apos; terms.</p>
          </article>

          <article>
            <h2>Contact and changes</h2>
            <p>For marketing and promotion, contact <a href="mailto:hello@mojeeb.xyz">hello@mojeeb.xyz</a>. We may update these terms when the game changes; the latest version is always published here. Your use of Beat Ballot is also covered by the <Link href="/privacy">Privacy Notice</Link>.</p>
          </article>
        </div>
      </section>
    </EditorialShell>
  );
}
