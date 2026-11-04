import { afterEach, test } from "bun:test";
import { loadInitialRouteModules } from "./routes";

const originalLocation = Object.getOwnPropertyDescriptor(
  globalThis,
  "location",
);

afterEach(() => {
  if (originalLocation) {
    Object.defineProperty(globalThis, "location", originalLocation);
  } else {
    Reflect.deleteProperty(globalThis, "location");
  }
});

test("loading route modules", async () => {
  const mockLocation = {
    href: "https://example.com",
    pathname: "/",
    origin: "https://example.com",
  };

  Object.defineProperty(globalThis, "location", {
    value: mockLocation,
    writable: true,
    configurable: true,
  });

  await loadInitialRouteModules();
});
