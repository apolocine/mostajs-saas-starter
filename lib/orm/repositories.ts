/**
 * Typed repositories. @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { BaseRepository } from '@mostajs/orm';
import { getOrm } from './client';
import { UserSchema, SessionSchema, ProjectSchema, TaskSchema } from './schemas';

export type User = { id: string; email: string; name: string; passwordHash: string };
export type Session = { id: string; token: string; expiresAt: string | Date; user: string };
export type Project = { id: string; name: string; description?: string; owner: string };
export type Task = { id: string; title: string; done: boolean; project: string };

export async function getRepos() {
  const dialect = await getOrm();
  return {
    users: new BaseRepository<User>(UserSchema, dialect),
    sessions: new BaseRepository<Session>(SessionSchema, dialect),
    projects: new BaseRepository<Project>(ProjectSchema, dialect),
    tasks: new BaseRepository<Task>(TaskSchema, dialect),
  };
}
