import Link from 'next/link';

// Static marketing page — no auth, no DB, no cookies. Renders instantly and
// stays prerendered (important for fast, reliable boots in WebContainers).

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="container">
          <Link href="/" className="brand">◆ YourStartup <span className="dim">· SaaS starter</span></Link>
          <div className="nav-actions">
            <Link href="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Get started</Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="hero">
          <span className="badge-pill">Built on @mostajs/orm · 13 databases · boots in your browser</span>
          <h1>Ship your <span className="grad">startup MVP</span><br />in a weekend.</h1>
          <p>A clean full-stack starter — landing page, authentication and a CRUD dashboard — ready to rename for your idea. No database to install: it runs SQLite in WebAssembly.</p>
          <div className="cta">
            <Link href="/signup" className="btn btn-primary">Create your account</Link>
            <Link href="/login" className="btn">Try the demo →</Link>
          </div>
          <p className="muted" style={{ fontSize: '.85rem', marginTop: '1rem' }}>
            Demo login: <code>demo@example.com</code> / <code>admin123</code>
          </p>
        </section>

        <section className="features">
          <div className="feature"><div className="ico">🔐</div><h3>Auth included</h3><p>Email + password signup, login and sessions — homegrown and readable, no library to learn.</p></div>
          <div className="feature"><div className="ico">🗂️</div><h3>CRUD dashboard</h3><p>Projects &amp; tasks scoped to each user. Rename the entities to model your own product.</p></div>
          <div className="feature"><div className="ico">🌍</div><h3>Any database</h3><p>One API, 13 databases via @mostajs/orm. Start on WASM SQLite, switch to Postgres with one env var.</p></div>
        </section>
      </main>

      <footer className="site-footer">Built with <code>@mostajs/orm</code> — rename the entities, keep the foundation, launch your startup.</footer>
    </>
  );
}
