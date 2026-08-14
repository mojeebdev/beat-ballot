import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const secret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl || !secret) {
  throw new Error("Neon Auth requires NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET.");
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: { secret, sessionDataTtl: 300 },
});
