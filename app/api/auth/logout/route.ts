/**
 * POST /api/auth/logout — clear the session (DB + cookie).
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { type NextRequest, NextResponse } from 'next/server';
import { getRepos } from '@/lib/orm/repositories';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  if (token) {
    const { sessions } = await getRepos();
    const session = await sessions.findOne({ token });
    if (session) await sessions.delete(session.id);
  }
  const res = NextResponse.redirect(new URL('/', req.url), 303);
  res.cookies.delete('session');
  return res;
}
