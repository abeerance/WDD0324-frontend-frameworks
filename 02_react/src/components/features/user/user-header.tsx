import { Text } from "@/components/ui/text/text";
import { UserAvatar, type UserAvatarProps } from "./user-avatar";

/**
 * Props interface for UserHeader component
 *
 * Extends UserAvatarProps but excludes 'avatarAlt' since we derive it from the name prop.
 * This pattern ensures type safety while avoiding prop duplication and potential conflicts.
 */
interface UserHeaderProps extends Omit<UserAvatarProps, "avatarAlt"> {
	name: string; // User's display name, used for both display and avatar alt text
	email: string; // User's email address for secondary identification
}

/* the more simple interface alternative variant
interface UserHeaderProps {
	name: string; // User's display name, used for both display and avatar alt text
	email: string; // User's email address for secondary identification
	avatarUrl: string; // URL pointing to the user's profile image
	isOnline: boolean; // Current online status to show/hide the status indicator
}
*/

/**
 * UserHeader Component
 *
 * Displays the primary identification section of a user profile.
 * Combines the user's avatar with their name and email in a horizontal layout.
 * This component serves as the visual anchor and primary identification area.
 *
 * Design pattern: Uses the user's name as the avatar alt text to ensure accessibility
 * while maintaining a clean prop interface by omitting redundant avatarAlt prop.
 *
 * @param avatarUrl - URL for the user's profile image (inherited from UserAvatarProps)
 * @param isOnline - Boolean indicating user's online status (inherited from UserAvatarProps)
 * @param name - User's display name, also used as avatar alt text
 * @param email - User's email address for secondary identification
 * @returns JSX element representing the user header section
 */
export const UserHeader = ({
	avatarUrl,
	isOnline,
	name,
	email,
}: UserHeaderProps) => {
	return (
		// Container with horizontal flex layout and bottom margin for section spacing
		<div className="flex items-center mb-m">
			{/* User avatar with online status indicator */}
			{/* Uses name as alt text for accessibility - describes who is in the image */}
			<UserAvatar avatarUrl={avatarUrl} avatarAlt={name} isOnline={isOnline} />

			{/* Text content container with left margin for spacing from avatar */}
			<div className="ml-m">
				{/* Primary user name display */}
				{/* Uses semantic h2 heading for proper document structure */}
				{/* High contrast text color for primary information hierarchy */}
				<Text
					as="h2"
					variant="headline-3"
					className="font-semibold text-neutral-98"
				>
					{name}
				</Text>

				{/* Secondary email display */}
				{/* Lower contrast text color to establish visual hierarchy */}
				{/* No semantic heading since it's supplementary information */}
				<Text className="text-neutral-60">{email}</Text>
			</div>
		</div>
	);
};
