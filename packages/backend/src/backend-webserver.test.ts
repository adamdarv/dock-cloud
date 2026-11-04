import { expect, test, describe, beforeAll, afterAll, spyOn } from "bun:test";
import { startWebserver } from "./backend-webserver";

const frontendUrl = "http://frontend.example.com";

describe("Webserver tests", () => {
  let app: ReturnType<typeof startWebserver>;
  let baseUrl: URL;
  let logSpy: ReturnType<typeof spyOn>;

  beforeAll(() => {
    logSpy = spyOn(console, "log").mockImplementation(() => {});
    app = startWebserver({ port: 0, frontendUrl });
    baseUrl = app.server!.url;
  });

  afterAll(async () => {
    await app.stop();
    logSpy.mockRestore();
  });

  test("GET / returns Hello World", async () => {
    const response = await fetch(new URL("/", baseUrl));
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Hello World");
  });

  test("unknown route returns 404", async () => {
    const response = await fetch(new URL("/does-not-exist", baseUrl));
    expect(response.status).toBe(404);
  });

  test("CORS headers on allowed origin", async () => {
    const response = await fetch(new URL("/", baseUrl), {
      headers: { Origin: frontendUrl },
    });
    expect(response.headers.get("access-control-allow-origin")).toBe(
      frontendUrl,
    );
    expect(response.headers.get("access-control-allow-credentials")).toBe(
      "true",
    );
  });

  test("CORS preflight", async () => {
    const response = await fetch(new URL("/", baseUrl), {
      method: "OPTIONS",
      headers: {
        Origin: frontendUrl,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    });
    expect(response.status).toBe(204);
    const methods = response.headers.get("access-control-allow-methods") ?? "";
    for (const method of ["GET", "POST", "PUT", "DELETE", "OPTIONS"]) {
      expect(methods).toContain(method);
    }
    const headers = response.headers.get("access-control-allow-headers") ?? "";
    expect(headers).toContain("Content-Type");
    expect(headers).toContain("Authorization");
  });

  test("CORS rejects other origins", async () => {
    const response = await fetch(new URL("/", baseUrl), {
      headers: { Origin: "http://evil.example.com" },
    });
    expect(response.headers.get("access-control-allow-origin")).not.toBe(
      "http://evil.example.com",
    );
  });

  test("logs each request", async () => {
    logSpy.mockClear();
    await fetch(new URL("/", baseUrl));
    await Bun.sleep(50);
    const logged = logSpy.mock.calls.map((c: unknown[]) => String(c[0]));
    expect(
      logged.some((l: string) => /^GET .* - 200 - [\d.]+ms$/.test(l)),
    ).toBe(true);
  });
});
