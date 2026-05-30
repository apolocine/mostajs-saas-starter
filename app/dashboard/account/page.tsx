import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return (
    <>
      <Link href="/dashboard" className="back">← Dashboard</Link>
      <div className="dash-head" style={{ marginTop: '1rem' }}><h1>Account</h1></div>
      <div className="panel">
        <div className="field"><label>Name</label><div>{user.name}</div></div>
        <div className="field"><label>Email</label><div>{user.email}</div></div>
        <p className="muted" style={{ fontSize: '.88rem', margin: 0 }}>
          Next steps for your startup: add profile editing, password change, teams, billing… — the foundation is yours.
        </p>
      </div>
    </>
  );
}
