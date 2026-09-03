import "server-only";
import { apiFetch, ApiError, ForbiddenError } from "@/lib/api-client";
import type { RegisterUserInput, User } from "@/types/user";

export function getUsers(token: string) {
  return apiFetch<User[]>("/api/users", { token });
}

export async function registerUser(data: RegisterUserInput, token: string) {
  try {
    return await apiFetch<unknown>("/api/users/register", {
      method: "POST",
      body: data,
      token,
    });
  } catch (err) {
    if (err instanceof ApiError && err.status === 403) {
      throw new ForbiddenError("You do not have permission to create users.");
    }
    throw err;
  }
}
