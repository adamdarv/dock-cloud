import Elysia, { type Context } from "elysia";
import { cors } from "@elysia/cors";
import { auth } from "@dock-cloud/auth";

const requestTimes = new WeakMap<Request, number>();

export function createApp({ frontendUrl }: { frontendUrl?: string } = {}) {
  const betterAuthView = (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];

    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
      return auth.handler(context.request);
    } else {
      context.status(405);
    }
  };

  return new Elysia()
    .onRequest(({ request }) => {
      requestTimes.set(request, performance.now());
    })
    .onAfterResponse({ as: "global" }, ({ request, set }) => {
      const duration =
        performance.now() - (requestTimes.get(request) ?? performance.now());
      console.log(
        `${request.method} ${request.url} - ${set.status ?? 200} - ${duration.toFixed(2)}ms`,
      );
    })
    .get("/", () => "Hello World")
    .all("/api/auth/*", betterAuthView)
    .use(
      cors({
        origin: frontendUrl,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      }),
    );
}

export function startWebserver({
  port = process.env.PORT ? parseInt(process.env.PORT) : 3000,
  frontendUrl = process.env.FRONTEND_URL,
}: {
  port?: number;
  frontendUrl?: string;
} = {}) {
  const startTime = performance.now();

  const app = createApp({ frontendUrl }).listen(port);

  console.log(`Server running at ${app.server?.url}`);
  console.log(`Startup time: ${(performance.now() - startTime).toFixed(2)}ms`);

  return app;
}
