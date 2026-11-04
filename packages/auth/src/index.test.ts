import { expect, test, afterAll } from "bun:test";
import { createAuthClient } from "better-auth/client";
import { auth } from "./index";
import { database } from "@dock-cloud/database";
import { user, session } from "@dock-cloud/database/schema";

const origin = process.env.BACKEND_URL!;
const email = `ci-${crypto.randomUUID()}@example.com`;
const password = "correct-horse-battery";

function generateValidName() {
  return `ci_${crypto.randomUUID().slice(0, 8)}`.replaceAll("-", "_");
}

const client = createAuthClient({
  baseURL: origin,
  fetchOptions: {
    customFetchImpl: (input, init) =>
      auth.handler(
        input instanceof Request
          ? new Request(input, init)
          : new Request(input.toString(), init),
      ),
  },
});

afterAll(async () => {
  await database.delete(session);
  await database.delete(user);
});

test("sign up", async () => {
  const { data, error } = await client.signUp.email({
    email,
    password,
    name: generateValidName(),
  });
  expect(error).toBeNull();
  expect(data?.user.email).toBe(email);
});

test("rejects names outside the allowed length", async () => {
  for (const invalidName of ["ab", "a".repeat(33)]) {
    const { data, error } = await client.signUp.email({
      email: `ci-${crypto.randomUUID()}@example.com`,
      password,
      name: invalidName,
    });

    expect(data).toBeNull();
    expect(error?.status).toBe(400);
  }
});

test("accepts names at both length limits", async () => {
  for (const validName of [
    `a${crypto.randomUUID().slice(0, 2)}`,
    `a${crypto.randomUUID().replaceAll("-", "").slice(0, 31)}`,
  ]) {
    const { data, error } = await client.signUp.email({
      email: `ci-${crypto.randomUUID()}@example.com`,
      password,
      name: validName,
    });

    expect(error).toBeNull();
    expect(data?.user.name).toBe(validName);
  }
});

test("rejects a name that is already taken", async () => {
  const duplicateName = generateValidName();
  const { error: createError } = await client.signUp.email({
    email: `ci-${crypto.randomUUID()}@example.com`,
    password,
    name: duplicateName,
  });
  expect(createError).toBeNull();

  const { data, error } = await client.signUp.email({
    email: `ci-${crypto.randomUUID()}@example.com`,
    password,
    name: duplicateName,
  });

  expect(data).toBeNull();
  expect(error?.status).toBe(400);
  expect(error?.message).toBe("Name is already taken.");
});

test("sign in and read the session", async () => {
  const headers = new Headers();
  const { error } = await client.signIn.email(
    { email, password },
    {
      onSuccess: (ctx) => {
        headers.set(
          "cookie",
          ctx.response.headers.get("set-cookie")!.split(";")[0]!,
        );
      },
    },
  );
  expect(error).toBeNull();

  const { data } = await client.getSession({ fetchOptions: { headers } });
  expect(data?.user.email).toBe(email);
});

test("wrong password returns an error", async () => {
  const { data, error } = await client.signIn.email({
    email,
    password: "wrong-password",
  });
  expect(data).toBeNull();
  expect(error?.status).toBe(401);
});
