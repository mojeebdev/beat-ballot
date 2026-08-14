import Link from "next/link";

export function EditorialShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="editorial-page">
      <div className="noise" aria-hidden="true" />
      <header className="site-header editorial-header">
        <Link className="wordmark" href="/" aria-label="Beat Ballot home">BEAT<br />BALLOT<span>.</span></Link>
        <div className="header-status"><span className="status-led" /><span>SEASON 01 / OPEN</span></div>
        <nav aria-label="Primary navigation">
          <Link href="/#arena">PLAY</Link>
          <Link href="/season-01">SEASON</Link>
          <Link href="/catalogue">INDEX</Link>
          <Link href="/method">METHOD</Link>
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <div>
          <Link className="wordmark wordmark--footer" href="/">BEAT<br />BALLOT<span>.</span></Link>
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
