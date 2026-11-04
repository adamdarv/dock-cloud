import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

export const database = drizzle({
  client: mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
});
