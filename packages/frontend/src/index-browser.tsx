import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { loadInitialRouteModules, routes } from "./routes";
import { App } from "./App";
import { RouterProvider } from "react-router/dom";

async function main() {
  await loadInitialRouteModules();

  const router = createBrowserRouter(routes);

  const elem = document.getElementById("root")!;
  const app = (
    <App>
      <RouterProvider router={router} />
    </App>
  );

  // https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
  const root = import.meta.hot.data.root;

  if (root) {
    root.render(app);
  } else if (process.env.NODE_ENV === "development") {
    // Dev mode never server-renders into #root, so hydrating would throw
    // mismatch errors. Do a plain client-side render instead.
    import.meta.hot.data.root = createRoot(elem);
    import.meta.hot.data.root.render(app);
  } else {
    import.meta.hot.data.root = hydrateRoot(elem, app);
  }
}

main();
