/**
 * Props interface for UserAvatar component
 *
 * Defines the contract for displaying a user's profile image with online status.
 * All props are required to ensure consistent avatar display across the application.
 */
export interface UserAvatarProps {
	avatarUrl: string; // URL pointing to the user's profile image
	avatarAlt: string; // Alternative text for accessibility (typically user's name)
	isOnline: boolean; // Current online status to show/hide the status indicator
}

/**
 * UserAvatar Component
 *
 * A reusable avatar component that displays a user's profile image with an optional
 * online status indicator. The component uses a relative positioning strategy to
 * overlay the status indicator in the bottom-right corner of the avatar.
 *
 * Accessibility: Proper alt text ensures screen readers can identify the user.
 * Visual hierarchy: Online status uses recognizable green color with sufficient contrast.
 *
 * @param avatarUrl - Source URL for the user's profile image
 * @param avatarAlt - Descriptive alt text for the image (required for accessibility)
 * @param isOnline - Boolean flag controlling visibility of the online status indicator
 * @returns JSX element representing the user avatar with optional status indicator
 */
export const UserAvatar = ({
	avatarUrl,
	avatarAlt,
	isOnline,
}: UserAvatarProps) => {
	return (
		// Relative positioning container to anchor the absolute-positioned status indicator
		<div className="relative">
			{/* Main profile image */}
			{/* Fixed dimensions with circular crop and subtle border for definition */}
			{/* object-cover ensures proper aspect ratio regardless of source image dimensions */}
			<img
				src={avatarUrl}
				alt={avatarAlt}
				className="w-16 h-16 rounded-full object-cover border-2 border-neutral-30"
			/>

			{/* Conditional online status indicator */}
			{/* Only renders when user is online - prevents empty div in DOM */}
			{isOnline && (
				// Absolute positioned indicator in bottom-right corner
				// Green background with white border creates clear visual distinction
				// Small size (w-4 h-4) maintains proportional relationship to avatar
				<div className="absolute bottom-0 right-0 w-4 h-4 bg-green-60 rounded-full border-2 border-neutral-10" />
			)}
		</div>
	);
};
