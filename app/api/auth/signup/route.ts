/**
 * POST /api/auth/signup — create an account + session, set the cookie.
 * Route Handler so the cookie is set on the response (no AsyncLocalStorage).
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { type NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { getRepos } from '@/lib/orm/repositories';
import { hashPassword } from '@/lib/auth/password';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = String(form.get('email') ?? '').toLowerCase().trim();
  const name = String(form.get('name') ?? '').trim();
  const password = String(form.get('password') ?? '');
  if (!email || !name || password.length < 6) {
    return NextResponse.redirect(new URL('/signup?error=invalid', req.url), 303);
  }

  const { users, sessions } = await getRepos();
  if (await users.findOne({ email })) {
    return NextResponse.redirect(new URL('/signup?error=exists', req.url), 303);
  }

  const user = await users.create({ email, name, passwordHash: hashPassword(password) });
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 86400000);
  await sessions.create({ token, user: user.id, expiresAt });

  const res = NextResponse.redirect(new URL('/dashboard', req.url), 303);
  res.cookies.set('session', token, { httpOnly: true, sameSite: 'lax', path: '/', expires: expiresAt });
  return res;
}
