/**
 * Task Server Actions — add / toggle / delete (within a project).
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
'use server';
import { safeRevalidate } from '../revalidate';
import { redirect } from 'next/navigation';
import { getRepos } from '../orm/repositories';
import { getCurrentUser } from '../auth/session';

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export async function addTask(projectId: string, formData: FormData) {
  await requireUser();
  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;
  const { tasks } = await getRepos();
  await tasks.create({ title, done: false, project: projectId });
  safeRevalidate(`/dashboard/projects/${projectId}`);
}

export async function toggleTask(id: string, projectId: string, done: boolean) {
  await requireUser();
  const { tasks } = await getRepos();
  await tasks.update(id, { done });
  safeRevalidate(`/dashboard/projects/${projectId}`);
}

export async function deleteTask(id: string, projectId: string) {
  await requireUser();
  const { tasks } = await getRepos();
  await tasks.delete(id);
  safeRevalidate(`/dashboard/projects/${projectId}`);
}
