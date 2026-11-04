import { expect, test } from "bun:test";
import { $ } from "bun";

test("frontend build", async () => {
  await $`bun run frontend:build`;

  expect(
    await Bun.file("packages/frontend/dist/static/index.html").exists(),
  ).toBe(true);
  expect(
    await Bun.file("packages/frontend/dist/route-manifest.json").exists(),
  ).toBe(true);
  expect(await Bun.file("packages/frontend/dist/frontend").exists()).toBe(true);
});
