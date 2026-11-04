import { expect, test } from "bun:test";
import { $ } from "bun";

test("frontend build", async () => {
  await $`bun run backend:build`;

  expect(await Bun.file("packages/backend/dist/backend").exists()).toBe(true);
});
