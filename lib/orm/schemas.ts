/**
 * Domain model — a generic SaaS starter you can "rename & go":
 *   User    → your accounts
 *   Project → your core business entity (rename to Listing, Order, Patient…)
 *   Task    → a child of the core entity
 *   Session → server-side auth sessions (homegrown, no library)
 *
 * Pure TypeScript EntitySchemas — no codegen. @author Dr Hamid MADANI <drmdh@msn.com>
 */
import type { EntitySchema } from '@mostajs/orm';

export const UserSchema: EntitySchema = {
  name: 'User',
  collection: 'users',
  fields: {
    email: { type: 'string', required: true, unique: true, lowercase: true, trim: true },
    name: { type: 'string', required: true, trim: true },
    passwordHash: { type: 'string', required: true }, // scrypt — never store plaintext
  },
  relations: {
    projects: { target: 'Project', type: 'one-to-many', mappedBy: 'owner', fetch: 'lazy' },
  },
  indexes: [{ fields: ['email'], unique: true }],
  timestamps: true,
};

export const SessionSchema: EntitySchema = {
  name: 'Session',
  collection: 'sessions',
  fields: {
    token: { type: 'string', required: true, unique: true },
    expiresAt: { type: 'date', required: true },
  },
  relations: {
    user: { target: 'User', type: 'many-to-one', required: true, onDelete: 'cascade' },
  },
  indexes: [{ fields: ['token'], unique: true }],
  timestamps: true,
};

export const ProjectSchema: EntitySchema = {
  name: 'Project',
  collection: 'projects',
  fields: {
    name: { type: 'string', required: true, trim: true },
    description: { type: 'text' },
  },
  relations: {
    owner: { target: 'User', type: 'many-to-one', required: true, onDelete: 'cascade' },
    tasks: { target: 'Task', type: 'one-to-many', mappedBy: 'project', cascade: ['persist', 'remove'], orphanRemoval: true },
  },
  indexes: [{ fields: ['owner', 'createdAt'] }],
  timestamps: true,
  softDelete: true,
};

export const TaskSchema: EntitySchema = {
  name: 'Task',
  collection: 'tasks',
  fields: {
    title: { type: 'string', required: true, trim: true },
    done: { type: 'boolean', default: false },
  },
  relations: {
    project: { target: 'Project', type: 'many-to-one', required: true, onDelete: 'cascade' },
  },
  indexes: [],
  timestamps: true,
};

export const ALL_SCHEMAS = [UserSchema, SessionSchema, ProjectSchema, TaskSchema];
