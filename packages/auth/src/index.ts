import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";
import { database } from "@dock-cloud/database";
import * as schema from "@dock-cloud/database/schema";

if (!process.env.BACKEND_URL || !process.env.FRONTEND_URL) {
  throw new Error("Missing BACKEND_URL or FRONTEND_URL environment variables");
}

/**
 * Returns the longest domain shared by both URLs' hostnames (e.g. `.example.com` for `app.example.com` and `api.example.com`), or undefined if there is none worth sharing cookies on (IP addresses, localhost, or differing TLDs).
 */
function getSharedCookieDomain(a: string, b: string) {
  const hostA = new URL(a).hostname.split(".").reverse();
  const hostB = new URL(b).hostname.split(".").reverse();
  const shared: string[] = [];

  for (let i = 0; i < Math.min(hostA.length, hostB.length); i++) {
    if (hostA[i] !== hostB[i]) {
      break;
    }
    shared.push(hostA[i]!);
  }

  if (shared.length < 2 || shared.every((label) => /^\d+$/.test(label))) {
    return undefined;
  }

  return `.${shared.reverse().join(".")}`;
}

const cookieDomain = getSharedCookieDomain(
  process.env.BACKEND_URL,
  process.env.FRONTEND_URL,
);

if (!process.env.AUTH_SECRET) {
  throw new Error("Missing AUTH_SECRET environment variable");
}

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET,
  database: drizzleAdapter(database, {
    provider: "mysql",
    schema,
  }),
  baseURL: {
    allowedHosts: [process.env.BACKEND_URL, process.env.FRONTEND_URL].map(
      (url) => new URL(url).host,
    ),
  },
  advanced: {
    // Must be identical for every process using this config, otherwise the cookie name differs (NODE_ENV-dependent by default)
    useSecureCookies: new URL(process.env.BACKEND_URL).protocol === "https:",
    crossSubDomainCookies: cookieDomain
      ? { enabled: true, domain: cookieDomain }
      : { enabled: false },
  },
  trustedOrigins: [process.env.FRONTEND_URL],
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (newUser) => {
          if (newUser.name.length < 3 || newUser.name.length > 32) {
            throw new APIError("BAD_REQUEST", {
              message: "Name must be between 3 and 32 characters.",
            });
          }

          for (const char of newUser.name) {
            if (!/^[a-zA-Z0-9_]+$/.test(char)) {
              throw new APIError("BAD_REQUEST", {
                message:
                  "Name can only contain letters, numbers, and underscores.",
              });
            }
          }

          const existingUser = await database
            .select({ id: schema.user.id })
            .from(schema.user)
            .where(eq(schema.user.name, newUser.name))
            .limit(1);

          if (existingUser.length > 0) {
            throw new APIError("BAD_REQUEST", {
              message: "Name is already taken.",
            });
          }
        },
      },
    },
  },
});
