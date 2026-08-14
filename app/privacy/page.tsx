import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial-shell";

export const metadata: Metadata = {
  title: "Privacy Notice | Beat Ballot",
  description: "How Beat Ballot handles email sign-in, aliases and verified ballot activity.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <EditorialShell>
      <section className="legal-page">
        <p className="section-label">BB / LEGAL / PRIVACY NOTICE</p>
        <h1>PRIVACY,<br /><em>IN PLAIN SIGHT.</em></h1>
        <p className="legal-page__intro">Beat Ballot is a fan-led cultural game, not a data product. This notice explains the limited information involved when you use email or a magic link to enter the room.</p>
        <p className="legal-page__updated">LAST UPDATED / 14 AUGUST 2026</p>

        <div className="legal-page__content">
          <article>
            <h2>What we collect</h2>
            <p>When you sign in, Neon Managed Auth handles the email or magic-link flow and provides the account session needed to protect the ballot. Beat Ballot stores your account identifier, your chosen public fan alias, your verified picks, points and the time of each pick.</p>
            <p>To protect against repeat requests, the ballot also stores a one-way HMAC digest derived from your IP address and account identifier. It is used only for short voting-rate limits, not for advertising or public display.</p>
          </article>

          <article>
            <h2>What other fans can see</h2>
            <p>Your email is never shown in the game. Your chosen fan alias, picked song and relative time may appear in the public Last 10 picks feed and on the fan leaderboard. Choose an alias you are comfortable sharing publicly.</p>
          </article>

          <article>
            <h2>Why we use it</h2>
            <p>We use this information to sign you in, enforce one verified pick per round, award fan points, display the public game feed and keep the tally reliable. We do not sell personal information or use it for behavioural advertising.</p>
          </article>

          <article>
            <h2>Where it goes</h2>
            <p>Authentication and application data are processed through the service providers that run Beat Ballot&apos;s authentication, database and hosting. A social platform receives information only if you choose to use a share action. External source links follow the privacy practices of their own sites.</p>
          </article>

          <article>
            <h2>Retention and your choices</h2>
            <p>We keep aliases and ballot records while they are needed to run and protect the current game. You can ask about your data, request deletion of your Beat Ballot profile, or report a concern at <a href="mailto:hello@mojeeb.xyz">hello@mojeeb.xyz</a>. Deleting a profile may remove its fan alias from future displays while preserving an anonymised integrity record where necessary to prevent duplicate voting.</p>
          </article>

          <article>
            <h2>Contact</h2>
            <p>For privacy, marketing or promotion enquiries, email <a href="mailto:hello@mojeeb.xyz">hello@mojeeb.xyz</a>. See the <Link href="/terms">Terms</Link> for the rules of the room.</p>
          </article>
        </div>
      </section>
    </EditorialShell>
  );
}
