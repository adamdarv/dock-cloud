import { Glob } from "bun";
import { serve } from "bun-serve-compress";
import path, { basename } from "node:path";
import { auth } from "@dock-cloud/auth";
import { render } from "./index-server";
import index from "./index.html";
import { findPage, pageRequiresAuth } from "./pages";

const htmlCache = new Map<string, string>();
const defaultDistDirectory = path.join(import.meta.dir, "../dist");

export function getHtmlCache() {
  return htmlCache;
}

type SessionGetter = (request: Request) => Promise<unknown>;

const defaultGetSession: SessionGetter = (request) =>
  auth.api.getSession({ headers: request.headers });

async function getAuthRedirect(
  request: Request,
  getSession: SessionGetter,
): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (path.extname(pathname)) {
    return null;
  }

  const requiresAuth = pageRequiresAuth(pathname);
  const isAuthPage = findPage(pathname)?.requiresAuth === false;
  const loggedIn = Boolean(
    await getSession(request).catch((error) => {
      console.error("Failed to get session:", error);
      return null;
    }),
  );

  if (loggedIn && isAuthPage) {
    return Response.redirect(new URL("/", url), 302);
  }

  if (!loggedIn && requiresAuth) {
    return Response.redirect(new URL("/login", url), 302);
  }

  return null;
}

async function processRequest(
  request: Request,
  distDirectory: string,
  getSession: SessionGetter,
) {
  const pathname = new URL(request.url).pathname;

  const redirect = await getAuthRedirect(request, getSession);
  if (redirect) {
    return redirect;
  }

  if (htmlCache.get(pathname)) {
    return new Response(htmlCache.get(pathname), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  const staticDirectory = path.join(distDirectory, "static");
  const filePath = path.resolve(staticDirectory, pathname.slice(1));

  if (filePath.startsWith(`${staticDirectory}${path.sep}`)) {
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file, {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  }

  if (path.extname(pathname)) {
    return new Response("Not found", { status: 404 });
  }

  const htmlFile = Bun.file(path.join(distDirectory, "static/index.html"));
  let html = await htmlFile.text();
  html = await injectModulePreloadLinks(html, request, distDirectory);
  html = await renderSSR(html, request);

  htmlCache.set(pathname, html);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function findRequiredModules(
  jsText: string,
  existingModules: string[],
  routes: Record<string, string>,
): string[] {
  const routePaths = Object.values(routes);

  const matches = jsText.match(/chunk-[a-zA-Z0-9]+\.js/g);
  if (!matches) {
    return [];
  }

  const jsModules = [];

  for (const match of matches) {
    if (existingModules.includes(match) && !routePaths.includes(`/${match}`)) {
      jsModules.push(match);
    }
  }

  return jsModules;
}

async function findRequiredModulesFromFile(
  filePath: string,
  jsFiles: string[],
  routes: Record<string, string>,
  distDirectory: string,
): Promise<string[]> {
  const staticDirectory = path.join(distDirectory, "static");
  const file = Bun.file(path.join(staticDirectory, filePath));
  const text = await file.text();
  const requiredModules = findRequiredModules(text, jsFiles, routes);
  return requiredModules;
}

async function injectModulePreloadLinks(
  htmlText: string,
  request: Request,
  distDirectory: string,
): Promise<string> {
  const staticDirectory = path.join(distDirectory, "static");
  const pathname = new URL(request.url).pathname;

  const manifest = Bun.file(
    path.join(staticDirectory, "../route-manifest.json"),
  );
  const manifestContent = await manifest.text();
  const { routes, entryRoute } = JSON.parse(manifestContent);

  const route = routes[pathname];

  const preloadModules = new Set<string>();

  if (route) {
    preloadModules.add(route);
  }

  const glob = new Glob("**/*.js");
  const relativePaths = await Array.fromAsync(glob.scan(staticDirectory));
  const jsFiles = relativePaths.map((filePath) => basename(filePath));

  const entryRouteRequiredModules = await findRequiredModulesFromFile(
    entryRoute,
    jsFiles,
    routes,
    distDirectory,
  );
  const routeRequiredModules = route
    ? await findRequiredModulesFromFile(route, jsFiles, routes, distDirectory)
    : [];

  for (const module of entryRouteRequiredModules) {
    preloadModules.add(`/${module}`);
  }

  for (const module of routeRequiredModules) {
    preloadModules.add(`/${module}`);
  }

  const preloadLinks = Array.from(preloadModules)
    .map((module) => `<link rel="modulepreload" href="${module}" />`)
    .join("");

  const rewriter = new HTMLRewriter().on("head", {
    element(element) {
      element.append(preloadLinks, { html: true });
    },
  });

  const newHtml = rewriter.transform(htmlText);
  return newHtml;
}

async function renderSSR(htmlText: string, request: Request): Promise<string> {
  let reactText = await render(request);

  if (reactText instanceof Response) {
    reactText = await reactText.text();
  }

  const rewriter = new HTMLRewriter().on("#root", {
    element(element) {
      element.append(reactText, { html: true });
    },
  });

  const newHtml = rewriter.transform(htmlText);
  return newHtml;
}

export function startWebserver({
  distDirectory = defaultDistDirectory,
  getSession = defaultGetSession,
}: {
  distDirectory?: string;
  getSession?: SessionGetter;
} = {}) {
  if (process.env.NODE_ENV === "development") {
    const server = serve({
      routes: {
        "/*": index,
      },
      development: {
        hmr: true,
        console: true,
      },
    });

    console.log(`Development server running at ${server.url}`);
    return server;
  }

  const startTime = performance.now();

  const server = serve({
    async fetch(request) {
      const initialTime = performance.now();
      const response = await processRequest(request, distDirectory, getSession);
      const duration = performance.now() - initialTime;
      console.log(
        `${request.method} ${request.url} - ${response.status} - ${duration.toFixed(2)}ms`,
      );
      return response;
    },
  });

  console.log(`Server running at ${server.url}`);
  console.log(`Startup time: ${(performance.now() - startTime).toFixed(2)}ms`);

  return server;
}
