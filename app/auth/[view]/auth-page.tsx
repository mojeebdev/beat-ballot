"use client";

import { AuthView, NeonAuthUIProvider } from "@neondatabase/auth-ui";
import "@neondatabase/auth-ui/css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthPage({ view, returnTo }: { view: string; returnTo: string }) {
  const router = useRouter();

  return (
    <main className="auth-shell">
      <Link className="wordmark" href="/">BEAT<br />BALLOT<span>.</span></Link>
      <section className="auth-panel">
        <p className="section-label">FAN ACCESS / SECURE</p>
        <h1>Enter the room.</h1>
        <p>Sign in with an option your Beat Ballot account has enabled. Voting is for authenticated fans only.</p>
        <NeonAuthUIProvider
          authClient={authClient}
          credentials={false}
          magicLink
          social={{ providers: ["google"] }}
          signUp={false}
          redirectTo={returnTo}
          navigate={router.push}
          replace={router.replace}
          onSessionChange={() => router.refresh()}
          Link={Link}
        >
          <AuthView path={view as "sign-in" | "sign-up" | "forgot-password"} />
        </NeonAuthUIProvider>
        <p className="auth-legal">By continuing, you agree to the <Link href="/terms">Terms</Link> and acknowledge the <Link href="/privacy">Privacy Notice</Link>.</p>
      </section>
      <p className="auth-disclaimer">BEAT BALLOT IS AN INDEPENDENT, UNAFFILIATED CULTURAL EXPERIMENT.</p>
    </main>
  );
}
