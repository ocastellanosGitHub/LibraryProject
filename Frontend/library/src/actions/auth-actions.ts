"use server";

import { redirect } from "next/navigation";
import { login } from "@/services/auth-service";
import { setSessionCookie, deleteSessionCookie } from "@/lib/session";
import { ApiError } from "@/lib/api-client";

export type LoginFormState = { error?: string } | undefined;

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return { error: "Username and password are required." };
  }

  let token: string;
  try {
    token = await login({ username, password });
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 400)) {
      return { error: "Invalid username or password." };
    }
    return { error: "Unable to reach the server. Please try again." };
  }

  await setSessionCookie(token);
  redirect("/dashboard");
}

export async function logoutAction() {
  await deleteSessionCookie();
  redirect("/login");
}
