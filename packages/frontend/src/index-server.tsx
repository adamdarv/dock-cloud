import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";
import { renderToString } from "react-dom/server";
import { App } from "./App";

export async function render(request: Request) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(request);

  if (context instanceof Response) {
    return context;
  }

  const router = createStaticRouter(dataRoutes, context);
  return renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </App>,
  );
}
