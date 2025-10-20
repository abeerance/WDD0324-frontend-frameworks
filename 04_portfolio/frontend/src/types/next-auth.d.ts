import type { DefaultSession } from "next-auth";

/**
 * Type Extensions for Auth.js
 *
 * WHY THIS FILE EXISTS:
 * By default, Auth.js uses email-based authentication.
 * We're modifying it to use username-based authentication with Laravel API fields.
 *
 * IMPORTANT: This file MUST be created BEFORE auth config
 * so TypeScript knows about our custom fields.
 *
 * HOW IT WORKS:
 * - "declare module" tells TypeScript: "I want to modify this library's types"
 * - We're extending (not replacing) the existing types
 * - TypeScript will merge our extensions with Auth.js's default types
 */

declare module "next-auth" {
  /**
   * Session Interface
   *
   * This is what you get when you call:
   * - auth() in Server Components
   * - useSession() in Client Components
   * - getServerSession() in API routes
   *
   * We're adding all Laravel API user fields to the session
   */
  interface Session {
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      bio: string | null;
      userRole: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  /**
   * User Interface
   *
   * This is what your authorize() function must return
   * when credentials are valid.
   *
   * Structure matches Laravel API response
   */
  interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string | null;
    userRole: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT Interface
   *
   * This defines what's stored in the encrypted JWT token.
   * The token is automatically encrypted and stored in a secure cookie.
   *
   * These fields are available in:
   * - jwt() callback
   * - session() callback
   */
  interface JWT {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string | null;
    userRole: string;
    accessToken: string;
  }
}
