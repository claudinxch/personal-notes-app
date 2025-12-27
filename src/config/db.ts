import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema/index';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, { 
  prepare: false,
  max: 10,
});

export const db = drizzle(client, { schema, casing: 'snake_case' });
