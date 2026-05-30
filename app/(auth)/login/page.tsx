import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="sub">Log in to your dashboard.</p>
        {error === 'invalid' && <div className="error">Invalid email or password.</div>}
        <form action="/api/auth/login" method="post">
          <div className="field"><label>Email</label><input className="input" type="email" name="email" required defaultValue="demo@example.com" /></div>
          <div className="field"><label>Password</label><input className="input" type="password" name="password" required defaultValue="admin123" /></div>
          <button className="btn btn-primary" style={{ width: '100%' }} type="submit">Log in</button>
        </form>
        <p className="form-foot">No account? <Link href="/signup">Create one</Link></p>
      </div>
    </div>
  );
}
