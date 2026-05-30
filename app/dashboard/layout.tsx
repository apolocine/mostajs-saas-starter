import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { logout } from '@/lib/actions/auth';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <>
      <nav className="nav">
        <div className="container">
          <Link href="/dashboard" className="brand">◆ YourStartup</Link>
          <div className="nav-actions">
            <span className="muted" style={{ fontSize: '.88rem' }}>{user.name}</span>
            <Link href="/dashboard/account" className="btn btn-ghost btn-sm">Account</Link>
            <form action={logout}><button className="btn btn-ghost btn-sm" type="submit">Log out</button></form>
          </div>
        </div>
      </nav>
      <main className="container dash">{children}</main>
    </>
  );
}
