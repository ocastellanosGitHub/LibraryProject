import "server-only";
import { cookies } from "next/headers";
import { decodeJwtPayload } from "./jwt";

const COOKIE_NAME = "session";

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();

  let expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  try {
    const { exp } = decodeJwtPayload(token);
    if (exp) expires = new Date(exp * 1000);
  } catch {
    // Fall back to the default expiry above if the token can't be decoded.
  }

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  });
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
