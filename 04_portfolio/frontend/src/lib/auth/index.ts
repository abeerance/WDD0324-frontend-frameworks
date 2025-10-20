import NextAuth from "next-auth";
import { authConfig } from "./config";

/** * Auth.js Helper Functions * * These are used throughout your app: * - signIn: Trigger authentication * - signOut: End the user session * - auth: Get the current session */

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
