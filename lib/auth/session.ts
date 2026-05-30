/**
 * Read the logged-in user from the session cookie.
 *
 * Only READS the cookie (safe in Server Components, before any DB call). Session
 * creation / destruction happens in Route Handlers (app/api/auth/*) where the
 * cookie is set on the response — see those files for why.
 *
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { cookies } from 'next/headers';
import { getRepos } from '../orm/repositories';
import type { User } from '../orm/repositories';

const COOKIE = 'session';

/** Resolve the logged-in user from the session cookie, or null. */
export async function getCurrentUser(): Promise<User | null> {
  // Read the cookie BEFORE touching the DB (request context is intact here).
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
