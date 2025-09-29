import type { User } from "@/app/page";
import { UserActions } from "./user-actions";
import { UserHeader } from "./user-header";
import { UserInfo } from "./user-info";

// Props interface for the UserProfile component
// Expects a single user object that conforms to the User type
interface UserProfileProps {
	user: User;
}

/**
 * UserProfile Component
 *
 * A comprehensive user profile card that displays user information in a structured layout.
 * This component serves as a container that orchestrates three main sections:
 * - UserHeader: Displays primary user identification (name, avatar, online status, email)
 * - UserInfo: Shows additional user metadata (role, join date, online status)
 * - UserActions: Provides interactive elements for user-related actions
 *
 * @param user - User object containing all necessary user data
 * @returns JSX element representing the complete user profile card
 */
export const UserProfile = ({ user }: UserProfileProps) => {
	return (
		// Main container with neutral background, rounded corners, and centered layout
		// Uses design system classes for consistent spacing and visual hierarchy
		<div className="bg-neutral-10 rounded-lg shadow-md p-l max-w-md mx-auto border border-neutral-20">
			{/* Primary user identification section */}
			{/* Passes core user data: name, avatar, online status, and email */}
			<UserHeader
				name={user.name}
				avatarUrl={user.avatarUrl}
				isOnline={user.isOnline}
				email={user.email}
			/>

			{/* Secondary user information section */}
			{/* Displays role, join date, and reinforces online status */}
			<UserInfo
				role={user.role}
				joinDate={user.joinDate}
				isOnline={user.isOnline}
			/>

			{/* Interactive actions section */}
			{/* Standalone component that doesn't require user data props */}
			{/* Likely contains buttons for follow, message, block, etc. */}
			<UserActions />
		</div>
	);
};
