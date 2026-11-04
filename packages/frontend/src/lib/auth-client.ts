import {
  createAuthClient,
  type RequestContext,
  type SuccessContext,
} from "better-auth/react";
import { z } from "zod";

// Prefixed with `BUN_PUBLIC_` so Bun inlines it into the browser bundle
if (!process.env.BUN_PUBLIC_BACKEND_URL) {
  throw new Error("Missing BUN_PUBLIC_BACKEND_URL environment variable");
}

/**
 * Zod schema for validating sign-up form fields. The name's uniqueness is validated on the server.
 */
export const SignUpFields = z.object({
  email: z.email(),
  password: z.string().min(8),
  username: z.string().min(3).max(32),
});

/**
 * Zod schema for validating log-in form fields. It ensures that the email is a valid email address and the password is at least 8 characters long. It is not used for validation on the server or by the logIn function, but can be used for things such as forms.
 */
export const LogInFields = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const authClient = createAuthClient({
  baseURL: process.env.BUN_PUBLIC_BACKEND_URL,
});

/**
 * Use on the client to sign up using an email and password.
 * @param email The email address of the user.
 * @param password The password for the account.
 * @param username The unique username of the user.
 * @param onRequest Callback function invoked when the request is initiated.
 * @param onSuccess Callback function invoked when the request is successful.
 * @param onError Callback function invoked when an error occurs, with the error passed as an argument.
 * @returns A promise that resolves with the data and error from the sign-up request.
 */

export async function signUp(
  email: string,
  password: string,
  username: string,
  onRequest: (ctx: RequestContext) => void,
  onSuccess: (ctx: SuccessContext) => void,
  onError: (ctx: Error) => void,
) {
  return await authClient.signUp.email(
    {
      email,
      password,
      name: username,
      callbackURL: window.location.origin,
    },
    {
      onRequest,
      onSuccess,
      onError: (ctx) => {
        if (ctx && ctx.error) {
          onError(ctx.error);
        }
      },
    },
  );
}

/**
 * Use on the client to log in using an email and password.
 * @param email The email address of the user.
 * @param password The password for the account.
 * @param onRequest Callback function invoked when the request is initiated.
 * @param onSuccess Callback function invoked when the request is successful.
 * @param onError Callback function invoked when an error occurs, with the error passed as an argument.
 * @returns A promise that resolves with the data and error from the log-in request.
 */
export async function logIn(
  email: string,
  password: string,
  onRequest?: () => void,
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) {
  const { data, error } = await authClient.signIn.email(
    {
      email,
      password,
    },
    {
      onRequest: () => {
        onRequest?.();
      },
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (ctx) => {
        onError?.(ctx.error);
      },
    },
  );

  return { data, error };
}

export async function logOut() {
  return await authClient.signOut();
}
