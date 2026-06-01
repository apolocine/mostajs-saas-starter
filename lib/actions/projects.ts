/**
 * Project Server Actions — create / delete (owner-scoped).
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
'use server';
import { safeRevalidate } from '../revalidate';
import { redirect } from 'next/navigation';
import { getRepos } from '../orm/repositories';
import { getCurrentUser } from '../auth/session';

export async function createProject(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const name = String(formData.get('name') ?? '').trim();
  if (!name) return;
  const { projects } = await getRepos();
  await projects.create({ name, description: String(formData.get('description') ?? ''), owner: user.id });
  safeRevalidate('/dashboard');
}

export async function deleteProject(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const { projects } = await getRepos();
  const project = await projects.findById(id);
  if (project && project.owner === user.id) await projects.delete(id); // soft-delete, owner-scoped
  safeRevalidate('/dashboard');
}
