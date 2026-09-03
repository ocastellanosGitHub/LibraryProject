export type JwtPayload = {
  sub?: string;
  exp?: number;
  role?: string;
  [claim: string]: unknown;
};

// ASP.NET Core's default JWT claim type URIs (System.Security.Claims.ClaimTypes),
// used by this app's backend instead of short claim names like "role".
export const CLAIM_TYPE_ROLE =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
export const CLAIM_TYPE_NAME =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

/** Returns the first claim present in the payload, checking each key in order. */
export function getClaim(
  payload: JwtPayload,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string") return value;
  }
  return undefined;
}

export function decodeJwtPayload(token: string): JwtPayload {
  const [, payload] = token.split(".");
  if (!payload) {
    throw new Error("Invalid token format");
  }
  const json = Buffer.from(payload, "base64url").toString("utf8");
  return JSON.parse(json) as JwtPayload;
}

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = decodeJwtPayload(token);
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
