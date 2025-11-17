import { SignOutButton } from "@/components/auth/sign-out-button";
import { Grid, GridItem } from "@/components/layout/grid/grid";
import { Navigation } from "@/components/navigation/navigation";
import { auth } from "@/lib/auth";
import type { ReactNode } from "react";

/**
 * Dashboard Layout Component
 *
 * Wraps all dashboard pages with a consistent layout structure.
 * This layout includes:
 * - Header with navigation and user info
 * - Sign out button
 * - Main content area for child pages
 *
 * AUTHENTICATION:
 * Protected by middleware.ts - users must be logged in to access this layout.
 * We call auth() here to get session data for displaying user information.
 *
 * @param children - The dashboard page content to render
 */

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Fetch current session - contains user data from our Laravel API
	const session = await auth();

	return (
		<Grid className="flex flex-col min-h-dvh gap-m">
			<GridItem span={12}>
				<Navigation />
			</GridItem>
			<GridItem span={12} className="flex-1">
				{children}
			</GridItem>
		</Grid>
	);
}
