import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionToken } from "./session";
import {
  decodeJwtPayload,
  isTokenExpired,
  getClaim,
  CLAIM_TYPE_ROLE,
  type JwtPayload,
} from "./jwt";

export const getOptionalSession = cache(async () => {
  const token = await getSessionToken();
  if (!token || isTokenExpired(token)) {
    return null;
  }

  try {
    return { token, payload: decodeJwtPayload(token) };
  } catch {
    return null;
  }
});

export const verifySession = cache(async () => {
  const session = await getOptionalSession();
  if (!session) {
    redirect("/login");
  }
  return session;
});

export function hasRole(
  session: { payload: JwtPayload } | null | undefined,
  role: string
) {
  if (!session) return false;
  return getClaim(session.payload, "role", CLAIM_TYPE_ROLE) === role;
}

export const ADMIN_ROLE = "Admin";
