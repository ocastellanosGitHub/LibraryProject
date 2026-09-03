import "server-only";
import { apiFetch } from "@/lib/api-client";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export async function login(credentials: LoginCredentials): Promise<string> {
  const data = await apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: credentials,
  });
  return data.token;
}
