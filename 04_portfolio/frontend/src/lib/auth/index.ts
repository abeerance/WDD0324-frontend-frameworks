import NextAuth from "next-auth";
import { authConfig } from "./config";

/**
 * Auth.js Helper Functions
 *
 * These are SERVER-SIDE functions exported from NextAuth.
 * They run in Server Components, Server Actions, and API routes.
 *
 * EXPORTS:
 * - handlers: API route handlers for NextAuth endpoints
 * - signIn: Trigger authentication (server-side)
 * - signOut: End user session (server-side)
 * - auth: Get current session (server-side)
 *
 * CLIENT vs SERVER signOut:
 *
 * SERVER-SIDE (this file):
 * - Import: import { signOut } from "@/lib/auth"
 * - Usage: await signOut({ redirectTo: "/admin" })
 * - Use in: Server Actions, Server Components, API routes
 * - Parameters: { redirectTo: string }
 *
 * CLIENT-SIDE (next-auth/react):
 * - Import: import { signOut } from "next-auth/react"
 * - Usage: signOut({ callbackUrl: "/admin" })
 * - Use in: Client Components with onClick handlers
 * - Parameters: { callbackUrl: string }
 *
 * WHY TWO DIFFERENT signOut FUNCTIONS?
 * - Server-side: Runs on the server, can handle async operations
 * - Client-side: Runs in browser, handles redirects after clearing session
 * - Different parameter names prevent confusion about which context you're in
 */
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
