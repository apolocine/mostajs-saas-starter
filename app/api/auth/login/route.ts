/**
 * POST /api/auth/login — verify credentials, create a session, set the cookie.
 *
 * A Route Handler (not a Server Action) on purpose: the session cookie is set on
 * the NextResponse object (`res.cookies.set`), which does NOT depend on Next's
 * request AsyncLocalStorage. That matters because some runtimes (StackBlitz
 * WebContainer) lose that context across an async DB call, which breaks the
 * `cookies()` API. Setting cookies on the response works everywhere.
 *
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { type NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { getRepos } from '@/lib/orm/repositories';
import { verifyPassword } from '@/lib/auth/password';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = String(form.get('email') ?? '').toLowerCase().trim();
  const password = String(form.get('password') ?? '');

  const { users, sessions } = await getRepos();
  const user = await users.findOne({ email });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.redirect(new URL('/login?error=invalid', req.url), 303);
  }

  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 86400000);
  await sessions.create({ token, user: user.id, expiresAt });

  const res = NextResponse.redirect(new URL('/dashboard', req.url), 303);
  res.cookies.set('session', token, { httpOnly: true, sameSite: 'lax', path: '/', expires: expiresAt });
  return res;
}
