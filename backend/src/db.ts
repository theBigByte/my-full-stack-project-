import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv"

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'), // Parse port as number, default to 5432
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message, err.stack);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

// Generic function to execute queries
export const query = async <T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query<T>(text, params);
    return result;
  } finally {
    client.release(); // Always release the client back to the pool
  }
};

// Export the pool for direct use if needed
export { pool };