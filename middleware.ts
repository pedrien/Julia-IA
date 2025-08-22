import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Define routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/forgot-password", "/reset-password"];

// Define routes that should not be accessible when authenticated
const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/resend-verification",
  "/appartements",
  "/services",
  "/experience",
  "/contact",
];

function buildLoginUrl(origin: string, callbackUrl: string, error: string) {
  const loginUrl = new URL("/login", origin);
  loginUrl.searchParams.set("error", error);
  loginUrl.searchParams.set("callbackUrl", callbackUrl);
  return loginUrl;
}

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const currentTime = Math.floor(Date.now() / 1000);

  // If not authenticated and not on a public route, redirect to login
  if (!req.auth && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(
      buildLoginUrl(req.nextUrl.origin, req.nextUrl.href, "no_session")
    );
  }

  // If authenticated but session expired, redirect to login (except on login/signup)
  if (req.auth && req.auth.token.expires_at < currentTime) {
    if (!["/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(
        buildLoginUrl(req.nextUrl.origin, req.nextUrl.href, "session_expired")
      );
    }
    return NextResponse.next();
  }

  // If authenticated and session valid, block access to auth routes
  if (req.auth && req.auth.token.expires_at > currentTime) {
    if (AUTH_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|images|icons|videos).*)",
  ],
};
