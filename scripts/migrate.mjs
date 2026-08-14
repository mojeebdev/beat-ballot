import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { Client, neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");

const migrationsDir = join(process.cwd(), "db", "migrations");
const files = (await readdir(migrationsDir)).filter((name) => name.endsWith(".sql")).sort();
// Make HTTP auth failures explicit before opening the WebSocket session used for DDL.
await neon(process.env.DATABASE_URL)`SELECT 1 AS connection_check`;
const client = new Client(process.env.DATABASE_URL);

await client.connect();
try {
  await client.query("CREATE TABLE IF NOT EXISTS beat_ballot_migrations (filename TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())");
  for (const filename of files) {
    const seen = await client.query("SELECT 1 FROM beat_ballot_migrations WHERE filename = $1", [filename]);
    if (seen.rowCount) continue;
    await client.query("BEGIN");
    try {
      await client.query(await readFile(join(migrationsDir, filename), "utf8"));
      await client.query("INSERT INTO beat_ballot_migrations (filename) VALUES ($1)", [filename]);
      await client.query("COMMIT");
      console.log(`Applied ${filename}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  }
} finally {
  await client.end();
}
