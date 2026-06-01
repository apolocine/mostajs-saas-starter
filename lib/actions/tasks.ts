/**
 * Task Server Actions — add / toggle / delete (within a project).
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
'use server';
import { redirect } from 'next/navigation';
import { getRepos } from '../orm/repositories';
import { getCurrentUser } from '../auth/session';

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

// Actions basées sur formData uniquement (PAS d'args liés / closures capturant
// des variables) : sinon Next désérialise les args liés (await) AVANT le corps,
// et cookies() (via requireUser) perd le request scope en WebContainer. Les ids
// passent par des <input type="hidden">.

export async function addTask(formData: FormData) {
  await requireUser();
  const projectId = String(formData.get('projectId') ?? '');
  const title = String(formData.get('title') ?? '').trim();
  if (!title || !projectId) return;
  const { tasks } = await getRepos();
  await tasks.create({ title, done: false, project: projectId });
  redirect(`/dashboard/projects/${projectId}`); // re-navigation = refresh (WebContainer-safe)
}

export async function toggleTask(formData: FormData) {
  await requireUser();
  const id = String(formData.get('id') ?? '');
  const projectId = String(formData.get('projectId') ?? '');
  const done = formData.get('done') === 'true';
  const { tasks } = await getRepos();
  await tasks.update(id, { done });
  redirect(`/dashboard/projects/${projectId}`); // re-navigation = refresh (WebContainer-safe)
}

export async function deleteTask(formData: FormData) {
  await requireUser();
  const id = String(formData.get('id') ?? '');
  const projectId = String(formData.get('projectId') ?? '');
  const { tasks } = await getRepos();
  await tasks.delete(id);
  redirect(`/dashboard/projects/${projectId}`); // re-navigation = refresh (WebContainer-safe)
}
