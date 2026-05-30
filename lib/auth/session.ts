/**
 * Homegrown server-side sessions — a random token stored in DB + an httpOnly
 * cookie. Readable on purpose (no auth library) so students can understand and
 * extend it. @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { getRepos } from '../orm/repositories';
import type { User } from '../orm/repositories';

const COOKIE = 'session';
const TTL_DAYS = 7;

/** Create a session for a user and set the cookie. */
export async function createSession(userId: string): Promise<void> {
  const { sessions } = await getRepos();
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + TTL_DAYS * 86400000);
  await sessions.create({ token, user: userId, expiresAt });
  const jar = await cookies();
  jar.set(COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/', expires: expiresAt });
}

/** Resolve the logged-in user from the session cookie, or null. */
export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const { sessions } = await getRepos();
  const session = await sessions.findOne({ token });
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) return null;
  const populated = (await sessions.findByIdWithRelations(session.id, ['user'])) as
    | { user?: User }
    | null;
  return populated?.user ?? null;
}

/** Destroy the current session (logout). */
export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    const { sessions } = await getRepos();
    const session = await sessions.findOne({ token });
    if (session) await sessions.delete(session.id);
  }
  jar.delete(COOKIE);
}
