import Link from 'next/link';
import { signup } from '@/lib/actions/auth';

export const dynamic = 'force-dynamic';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="sub">Start building your startup MVP.</p>
        {error === 'exists' && <div className="error">An account with this email already exists.</div>}
        {error === 'invalid' && <div className="error">Check your details — password must be at least 6 characters.</div>}
        <form action={signup}>
          <div className="field"><label>Name</label><input className="input" name="name" required placeholder="Ada Lovelace" /></div>
          <div className="field"><label>Email</label><input className="input" type="email" name="email" required placeholder="you@startup.com" /></div>
          <div className="field"><label>Password</label><input className="input" type="password" name="password" required minLength={6} placeholder="at least 6 characters" /></div>
          <button className="btn btn-primary" style={{ width: '100%' }} type="submit">Create account</button>
        </form>
        <p className="form-foot">Already have an account? <Link href="/login">Log in</Link></p>
      </div>
    </div>
  );
}
