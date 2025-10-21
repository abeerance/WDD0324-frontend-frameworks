import NextAuth from "next-auth";
import type { NextAuthRequest } from "next-auth";
import { authConfig } from "./lib/auth/config";

/**
 * Initialize NextAuth with our configuration
 * This gives us the auth wrapper function that adds session data to requests
 */
const { auth } = NextAuth(authConfig);

/**
 * Middleware Function
 *
 * This runs on EVERY request that matches our matcher config below.
 * The auth() wrapper automatically adds session information to req.auth
 *
 * @param req - NextAuthRequest (NextRequest + auth property with session data)
 */
export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;

  // Check if user has a valid session
  const isLoggedIn = !!req.auth;

  // Determine which protected area the user is trying to access
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isOnAdmin = nextUrl.pathname.startsWith("/admin");

  // Protect dashboard routes - redirect to login if not authenticated
  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/admin", nextUrl));
  }

  // Redirect authenticated users away from login page to dashboard
  if (isOnAdmin && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  // Allow request to proceed if no redirect conditions are met
});

/**
 * Middleware Matcher Configuration
 *
 * Defines which routes this middleware runs on.
 * Currently runs on ALL routes EXCEPT:
 * - /api/* (API routes)
 * - /_next/static/* (static files)
 * - /_next/image/* (image optimization)
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
