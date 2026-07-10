import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not defined. Please add it to your .env file.\n' +
      'Example: DATABASE_URL="postgresql://user:password@host:5432/database"\n' +
      'Make sure to run database commands with: pnpm run db:migrate'
  );
}

/**
 * https://orm.drizzle.team/docs/get-started/neon-new#step-5---setup-drizzle-config-file
 */
export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
