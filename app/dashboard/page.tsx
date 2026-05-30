import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { getRepos } from '@/lib/orm/repositories';
import { createProject } from '@/lib/actions/projects';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const { projects } = await getRepos();
  const list = await projects.findAll({ owner: user.id }, { sort: { createdAt: -1 } });

  return (
    <>
      <div className="dash-head"><h1>Your projects</h1></div>

      <div className="panel">
        <form action={createProject} className="row-form">
          <div className="field"><label>New project</label><input className="input" name="name" placeholder="e.g. Launch the MVP" required /></div>
          <div className="field"><label>Description</label><input className="input" name="description" placeholder="optional" /></div>
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>

      {list.length === 0 ? (
        <div className="empty">No projects yet — create your first one above.</div>
      ) : (
        <div className="grid">
          {list.map((p) => (
            <Link key={p.id} href={`/dashboard/projects/${p.id}`} className="card">
              <h3>{p.name}</h3>
              <p>{p.description || 'No description'}</p>
              <div className="card-foot"><span>Open →</span></div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
