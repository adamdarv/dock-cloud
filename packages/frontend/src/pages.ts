export type Page = {
  path: string;
  /** Source module, relative to the frontend package root (used by build.ts). */
  routeModule: string;
  requiresAuth: boolean;
  load: () => Promise<any>;
};

export const pages: Page[] = [
  {
    path: "/",
    routeModule: "src/pages/index.tsx",
    requiresAuth: true,
    load: () => import("./pages/index"),
  },
  {
    path: "/login",
    routeModule: "src/pages/login.tsx",
    requiresAuth: false,
    load: () => import("./pages/login"),
  },
  {
    path: "/signup",
    routeModule: "src/pages/signup.tsx",
    requiresAuth: false,
    load: () => import("./pages/signup"),
  },
  {
    path: "/files",
    routeModule: "src/pages/files.tsx",
    requiresAuth: true,
    load: () => import("./pages/files"),
  },
  {
    path: "/notes",
    routeModule: "src/pages/notes.tsx",
    requiresAuth: true,
    load: () => import("./pages/notes"),
  },
  {
    path: "/music",
    routeModule: "src/pages/music.tsx",
    requiresAuth: true,
    load: () => import("./pages/music"),
  },
  {
    path: "/design",
    routeModule: "src/pages/design.tsx",
    requiresAuth: true,
    load: () => import("./pages/design"),
  },
];

function normalise(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function findPage(pathname: string): Page | undefined {
  const normalised = normalise(pathname);
  return pages.find((page) => page.path === normalised);
}

/** Unknown paths require login, as do all pages not explicitly public. */
export function pageRequiresAuth(pathname: string): boolean {
  return findPage(pathname)?.requiresAuth ?? true;
}

export const routeModules: Record<string, string> = Object.fromEntries(
  pages.map((page) => [page.path, page.routeModule]),
);
