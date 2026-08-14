import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

const editorialLinks = [
  { href: "/#arena", label: "PLAY" },
  { href: "/season-01", label: "SEASON" },
  { href: "/catalogue", label: "INDEX" },
  { href: "/method", label: "METHOD" },
];

export function EditorialShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="editorial-page">
      <div className="noise" aria-hidden="true" />
      <header className="site-header editorial-header">
        <Link className="wordmark" href="/" aria-label="Beat Ballot home">BEAT<br />BALLOT<span>.</span></Link>
        <div className="header-status"><span className="status-led" /><span>SEASON 01 / OPEN</span></div>
        <nav aria-label="Primary navigation">
          {editorialLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link href="/auth/sign-in?returnTo=/#arena">SIGN IN</Link>
        </nav>
        <MobileNav items={editorialLinks} />
      </header>
      {children}
      <footer className="site-footer">
        <div>
          <Link className="wordmark wordmark--footer" href="/">BEAT<br />BALLOT<span>.</span></Link>
          <p>THE SONGS. THE MOMENT. YOUR BALLOT.</p>
        </div>
        <div className="footer-meta">
          <span>© 2026 BEAT BALLOT</span>
          <a href="https://blindspotlab.xyz" target="_blank" rel="noreferrer">BLINDSPOTLAB ↗</a>
          <a href="https://mojeeb.xyz" target="_blank" rel="noreferrer">MOJEEB TITILAYO ↗</a>
          <a href="https://x.com/MojeebMotion" target="_blank" rel="noreferrer">@MOJEEBMOTION ↗</a>
          <a href="mailto:hello@mojeeb.xyz?subject=Beat%20Ballot%20marketing%20or%20promotion">MARKETING / PROMOTION ↗</a>
          <Link href="/privacy">PRIVACY</Link>
          <Link href="/terms">TERMS</Link>
          <span>UNAFFILIATED WITH THE ARTISTS</span>
        </div>
      </footer>
    </main>
  );
}
