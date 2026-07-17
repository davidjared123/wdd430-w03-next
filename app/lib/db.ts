import postgres from 'postgres';

let sqlInstance: ReturnType<typeof postgres> | null = null;

function getConnectionString() {
  return (
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    ''
  ).trim();
}

export function getSql() {
  if (sqlInstance) {
    return sqlInstance;
  }

  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error(
      'Database connection string is missing. Add POSTGRES_URL (or DATABASE_URL) to your .env file and restart the dev server.',
    );
  }

  const sslMode = process.env.NODE_ENV === 'production' ? 'require' : false;
  sqlInstance = postgres(connectionString, { ssl: sslMode });

  return sqlInstance;
}
