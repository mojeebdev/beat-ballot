import { createHmac } from "node:crypto";
import { auth } from "@/lib/auth";

export const aliasPattern = /^[A-Za-z0-9][A-Za-z0-9 _-]{2,23}$/;

export function normaliseAlias(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function isValidAlias(value: string) {
  return aliasPattern.test(value);
}

export async function requireUser() {
  const { data } = await auth.getSession();

  if (!data?.user) {
    return null;
  }

  return data.user;
}

export function requestHash(request: Request, userId: string) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;

  if (!secret) {
    throw new Error("NEON_AUTH_COOKIE_SECRET is required for request hashing.");
  }

  return createHmac("sha256", secret).update(`${ip}:${userId}`).digest("hex");
}

export function relativeTime(value: string) {
  const delta = Math.max(0, Date.now() - new Date(value).getTime());
  const minutes = Math.floor(delta / 60_000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
