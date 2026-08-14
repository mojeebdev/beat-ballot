"use client";

import { AuthView, NeonAuthUIProvider } from "@neondatabase/auth-ui";
import "@neondatabase/auth-ui/css";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function AuthPage({ view, returnTo }: { view: string; returnTo: string }) {
  return (
    <main className="auth-shell">
      <Link className="wordmark" href="/">BEAT<br />BALLOT<span>.</span></Link>
      <section className="auth-panel">
        <p className="section-label">FAN ACCESS / SECURE</p>
        <h1>Enter the room.</h1>
        <p>Sign in with an option your Beat Ballot account has enabled. Voting is for authenticated fans only.</p>
        <NeonAuthUIProvider authClient={authClient} redirectTo={returnTo}>
          <AuthView path={view as "sign-in" | "sign-up" | "forgot-password"} />
        </NeonAuthUIProvider>
      </section>
      <p className="auth-disclaimer">BEAT BALLOT IS AN INDEPENDENT, UNAFFILIATED CULTURAL EXPERIMENT.</p>
    </main>
  );
}
