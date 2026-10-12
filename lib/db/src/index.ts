import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let _pool: pg.Pool | undefined;
let _db: NodePgDatabase<typeof schema> | undefined;

function connectionString(): string {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
  return url;
}

/** Created on first use so a missing env var does not crash module import (serverless-friendly). */
export function getPool(): pg.Pool {
  if (!_pool) {
    const cs = connectionString();
    const local = /localhost|127\.0\.0\.1/.test(cs);
    _pool = new Pool({
      connectionString: cs,
      max: 3,
      ssl: local ? undefined : { rejectUnauthorized: false },
    });
  }
  return _pool;
}

export const pool = new Proxy({} as pg.Pool, {
  get: (_t, prop) => Reflect.get(getPool(), prop),
});

export const db = new Proxy({} as NodePgDatabase<typeof schema>, {
  get: (_t, prop) => {
    if (!_db) _db = drizzle(getPool(), { schema });
    return Reflect.get(_db, prop);
  },
});

/** Idempotent: creates the tables if they do not exist yet. */
export async function ensureSchema(): Promise<void> {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id serial PRIMARY KEY,
      title text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS messages (
      id serial PRIMARY KEY,
      conversation_id integer NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      role text NOT NULL,
      content text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);
}

export * from "./schema";
