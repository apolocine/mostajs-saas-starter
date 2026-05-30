/**
 * ORM connection (singleton) + demo seed.
 *
 * Default: sqljs (SQLite WASM) in-memory — no native binary, boots in Bolt.new.
 * Switch to a durable DB with one env (no code change):
 *   DB_DIALECT=sqlite DATABASE_URL=./app.db   # local Node (npm i better-sqlite3)
 *   DB_DIALECT=postgres DATABASE_URL=postgres://…   # production
 *
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { createConnection, type IDialect } from '@mostajs/orm';
import { ALL_SCHEMAS } from './schemas';
import { seedIfEmpty } from './seed-on-boot';

let _dialect: IDialect | null = null;

export async function getOrm(): Promise<IDialect> {
  if (_dialect) return _dialect;
  _dialect = await createConnection(
    {
      dialect: (process.env.DB_DIALECT as 'sqljs' | 'sqlite' | 'postgres') ?? 'sqljs',
      uri: process.env.DATABASE_URL ?? ':memory:',
      schemaStrategy: 'update',
      showSql: process.env.NODE_ENV !== 'production',
    },
    ALL_SCHEMAS,
  );
  await seedIfEmpty(_dialect);
  return _dialect;
}
