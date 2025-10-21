"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button/button";

/**
 * Sign Out Button Component
 *
 * WHY CLIENT COMPONENT?
 * - Uses onClick handler (browser event)
 * - Calls next-auth/react's signOut function (client-side only)
 * - Client components are needed for interactivity
 *
 * CLIENT-SIDE vs SERVER-SIDE signOut:
 *
 * THIS COMPONENT (Client-side):
 * - Import: import { signOut } from "next-auth/react"
 * - Parameter: callbackUrl (where to redirect after sign out)
 * - Runs in browser, no await needed
 * - Used in onClick handlers and client interactions
 *
 * Server-side alternative:
 * - Import: import { signOut } from "@/lib/auth"
 * - Parameter: redirectTo (not callbackUrl)
 * - Runs on server, requires await
 * - Used in Server Actions and Server Components
 *
 * HOW IT WORKS:
 * 1. User clicks button
 * 2. signOut() clears the NextAuth session cookie in browser
 * 3. User is redirected to /admin (login page)
 * 4. Middleware detects no session and allows access to /admin
 */
export const SignOutButton = () => {
	return (
		<Button
			variant="secondary"
			onClick={() => signOut({ callbackUrl: "/admin" })} // Client-side: uses 'callbackUrl'
		>
			Sign Out
		</Button>
	);
};
