import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const authMiddleware = auth.middleware({ loginUrl: "/auth/sign-in" });

export default function proxy(request: NextRequest) {
  const isProtectedFanRoute = request.nextUrl.pathname.startsWith("/fan");
  const isAuthCallback = request.nextUrl.searchParams.has("neon_auth_session_verifier");

  if (isProtectedFanRoute || isAuthCallback) {
    return authMiddleware(request);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] };
