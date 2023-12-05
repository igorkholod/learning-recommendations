import { Pool } from 'pg';

let db: Pool | undefined;
if (!db) {
  db = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'recommendation-system',
  });
}

export default db as Pool;
