import { expect, test, describe, beforeAll, afterAll } from "bun:test";
import { startWebserver, getHtmlCache } from "./frontend-webserver";
import type { Server } from "bun";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { parse } from "node-html-parser";

describe("Webserver tests", () => {
  let server: Server<undefined>;
  let distDirectory: string;
  let session: unknown = { user: { id: "1" } };

  beforeAll(async () => {
    distDirectory = await mkdtemp(path.join(tmpdir(), "dock-cloud-frontend-"));
    await Bun.write(
      path.join(distDirectory, "static/index.html"),
      '<html><head></head><body><div id="root"></div></body></html>',
    );
    await Bun.write(
      path.join(distDirectory, "static/entry.js"),
      "console.log('entry');",
    );
    await Bun.write(
      path.join(distDirectory, "route-manifest.json"),
      JSON.stringify({ routes: {}, entryRoute: "entry.js" }),
    );

    server = startWebserver({ distDirectory, getSession: async () => session });
  });

  afterAll(async () => {
    if (server) {
      server.stop();
    }
    await rm(distDirectory, { recursive: true, force: true });
  });

  test("GET /", async () => {
    const response = await fetch(new URL("/", server.url));
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("<html>");

    const htmlRoot = parse(text);
    const rootDiv = htmlRoot.querySelector("#root");
    expect(rootDiv).toBeDefined();
    expect(rootDiv).not.toBeNull();

    if (rootDiv) {
      expect(rootDiv.innerHTML).not.toBe("");
    }
  });

  test("HTML cache", async () => {
    const response1 = await fetch(new URL("/exampleroute", server.url));
    const text1 = await response1.text();

    const cache = getHtmlCache().get("/exampleroute");
    expect(cache).toBeDefined();
    expect(cache).not.toBeNull();

    const response2 = await fetch(new URL("/exampleroute", server.url));
    const text2 = await response2.text();

    expect(text1).toBe(text2);
  });

  test("fetching static file", async () => {
    const response = await fetch(new URL("/entry.js", server.url));
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("console.log('entry');");
  });

  test("redirects logged out users to /login", async () => {
    session = null;
    const response = await fetch(new URL("/", server.url), {
      redirect: "manual",
    });
    session = { user: { id: "1" } };
    expect(response.status).toBe(302);
    expect(new URL(response.headers.get("location")!).pathname).toBe("/login");
  });

  test("does not redirect logged out users on /login or /signup", async () => {
    session = null;
    for (const route of ["/login", "/signup"]) {
      const response = await fetch(new URL(route, server.url), {
        redirect: "manual",
      });
      expect(response.status).toBe(200);
    }
    session = { user: { id: "1" } };
  });

  test("redirects logged in users away from /login and /signup", async () => {
    for (const route of ["/login", "/signup"]) {
      const response = await fetch(new URL(route, server.url), {
        redirect: "manual",
      });
      expect(response.status).toBe(302);
      expect(new URL(response.headers.get("location")!).pathname).toBe("/");
    }
  });
});
