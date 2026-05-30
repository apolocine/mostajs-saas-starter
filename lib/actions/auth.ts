/**
 * Auth Server Actions — signup / login / logout.
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
'use server';
import { redirect } from 'next/navigation';
import { getRepos } from '../orm/repositories';
import { hashPassword, verifyPassword } from '../auth/password';
import { createSession, destroySession } from '../auth/session';

export async function signup(formData: FormData) {
  const email = String(formData.get('email') ?? '').toLowerCase().trim();
  const name = String(formData.get('name') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!email || !name || password.length < 6) redirect('/signup?error=invalid');

  const { users } = await getRepos();
  if (await users.findOne({ email })) redirect('/signup?error=exists');

  const user = await users.create({ email, name, passwordHash: hashPassword(password) });
  await createSession(user.id);
  redirect('/dashboard');
}

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').toLowerCase().trim();
  const password = String(formData.get('password') ?? '');

  const { users } = await getRepos();
  const user = await users.findOne({ email });
  if (!user || !verifyPassword(password, user.passwordHash)) redirect('/login?error=invalid');

  await createSession(user.id);
  redirect('/dashboard');
}

export async function logout() {
  await destroySession();
  redirect('/');
}
