/**
 * Idempotent demo seed — a ready-to-use account so the app is never empty.
 * Login: demo@example.com / password   (change it before going live!)
 * Disable with ORM_SEED_ON_BOOT=0.
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { BaseRepository, type IDialect } from '@mostajs/orm';
import { UserSchema, ProjectSchema, TaskSchema } from './schemas';
import type { User, Project, Task } from './repositories';
import { hashPassword } from '../auth/password';

export async function seedIfEmpty(dialect: IDialect): Promise<void> {
  if (process.env.ORM_SEED_ON_BOOT === '0') return;

  const users = new BaseRepository<User>(UserSchema, dialect);
  if ((await users.count({})) > 0) return; // idempotent

  const projects = new BaseRepository<Project>(ProjectSchema, dialect);
  const tasks = new BaseRepository<Task>(TaskSchema, dialect);

  const demo = await users.create({
    email: 'demo@example.com',
    name: 'Demo Founder',
    passwordHash: await hashPassword('admin123'),
  });

  const mvp = await projects.create({ name: 'Launch the MVP', description: 'First version to put in front of real users.', owner: demo.id });
  const sales = await projects.create({ name: 'Find the first 10 customers', description: 'Reach out, interview, iterate.', owner: demo.id });

  const mvpTasks: [string, boolean][] = [
    ['Define the problem & the user', true],
    ['Build the landing page', false],
    ['Wire up auth + database (@mostajs/orm)', false],
    ['Ship to beta users', false],
  ];
  for (const [title, done] of mvpTasks) await tasks.create({ title, done, project: mvp.id });

  for (const title of ['List 50 prospects', 'Write the outreach message', 'Book 10 discovery calls'])
    await tasks.create({ title, done: false, project: sales.id });
}
