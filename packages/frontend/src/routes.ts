import { matchRoutes, type RouteObject } from "react-router";
import { pages } from "./pages";

export const routes: RouteObject[] = [
  ...pages.map((page) => ({ path: page.path, lazy: page.load })),
  {
    path: "*",
    lazy: () => import("./components/ui/page/not-found"),
  },
];

export async function loadInitialRouteModules() {
  const matches = matchRoutes(routes, globalThis.location);

  await Promise.all(
    (matches ?? []).map(async ({ route }) => {
      if (typeof route.lazy !== "function") {
        return;
      }

      const module = await route.lazy();
      Object.assign(route, module, { lazy: undefined });
    }),
  );
}
