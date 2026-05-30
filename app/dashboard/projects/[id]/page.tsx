import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { getRepos } from '@/lib/orm/repositories';
import { addTask, toggleTask, deleteTask } from '@/lib/actions/tasks';
import { deleteProject } from '@/lib/actions/projects';

export const dynamic = 'force-dynamic';

type Task = { id: string; title: string; done: boolean };

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const { projects } = await getRepos();
  const project = (await projects.findByIdWithRelations(id, ['tasks'])) as
    | { name: string; description?: string; owner: string; tasks?: Task[] }
    | null;
  if (!project || project.owner !== user.id) notFound();

  const tasks = [...(project.tasks ?? [])].sort((a, b) => Number(a.done) - Number(b.done));
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <>
      <Link href="/dashboard" className="back">← Projects</Link>
      <div className="dash-head" style={{ marginTop: '1rem' }}>
        <div>
          <h1>{project.name}</h1>
          <p className="muted" style={{ margin: 0 }}>{doneCount}/{tasks.length} done · {project.description || 'No description'}</p>
        </div>
        <form action={async () => { 'use server'; await deleteProject(id); redirect('/dashboard'); }}>
          <button className="btn btn-danger btn-sm" type="submit">Delete project</button>
        </form>
      </div>

      <div className="panel">
        <form action={addTask.bind(null, id)} className="row-form">
          <div className="field"><label>New task</label><input className="input" name="title" placeholder="What needs doing?" required /></div>
          <button className="btn btn-primary" type="submit">Add task</button>
        </form>
      </div>

      {tasks.length === 0 ? (
        <div className="empty">No tasks yet — add the first step above.</div>
      ) : (
        <ul className="tasks">
          {tasks.map((t) => (
            <li key={t.id} className={`task ${t.done ? 'done' : ''}`}>
              <form action={async () => { 'use server'; await toggleTask(t.id, id, !t.done); }}>
                <button className="check" type="submit" aria-label="toggle task" />
              </form>
              <span className="task-title">{t.title}</span>
              <form action={async () => { 'use server'; await deleteTask(t.id, id); }}>
                <button className="btn btn-danger btn-sm" type="submit" aria-label="delete task">✕</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
