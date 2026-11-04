import { defineConfig } from "drizzle-kit";

if (
  !process.env.DATABASE_HOST ||
  !process.env.DATABASE_USER ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_NAME
) {
  throw new Error("Missing database environment variables");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
