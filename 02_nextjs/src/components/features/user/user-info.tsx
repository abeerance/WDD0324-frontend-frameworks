import { Text } from "@/components/ui/text/text";
import { cn } from "@/lib/utils";

/**
 * Props interface for UserInfo component
 *
 * Contains supplementary user information that provides context about the user's
 * role, tenure, and current availability status.
 */
interface UserInfoProps {
	role: string; // User's role or job title within the system/organization
	joinDate: string; // Date when user joined, expected to be pre-formatted for display
	isOnline: boolean; // Current online status for dynamic status display and styling
}

/**
 * UserInfo Component
 *
 * Displays secondary user information in a structured label-value format.
 * This component serves as the metadata section of a user profile, showing
 * contextual information that helps understand the user's position and availability.
 *
 * Design patterns:
 * - Consistent label-value structure for scanability
 * - Conditional styling for status based on online state
 * - Border separation to create visual hierarchy from primary user data
 *
 * @param role - User's role or position (e.g., "Admin", "Developer", "Manager")
 * @param joinDate - Formatted date string showing when user joined
 * @param isOnline - Boolean controlling status text and color styling
 * @returns JSX element representing the user information section
 */
export const UserInfo = ({ role, joinDate, isOnline }: UserInfoProps) => {
	return (
		// Section container with top border to separate from header section
		// Padding-top provides breathing room after the border
		<div className="border-t border-neutral-20 pt-m">
			{/* Role information row */}
			<div className="mb-xs">
				{/* Label with consistent styling for all field labels */}
				{/* Medium font weight and muted color establishes visual hierarchy */}
				<Text
					as="span"
					variant="body-small"
					className="font-medium text-neutral-60"
				>
					Role:
				</Text>
				{/* Value with higher contrast and spacing from label */}
				<Text as="span" variant="body-small" className="ml-xs text-neutral-98">
					{role}
				</Text>
			</div>

			{/* Join date information row */}
			<div className="mb-xs">
				{/* Label following same pattern as role */}
				<Text
					as="span"
					variant="body-small"
					className="font-medium text-neutral-60"
				>
					Member since:
				</Text>
				{/* Value expects pre-formatted date string */}
				<Text as="span" variant="body-small" className="ml-xs text-neutral-98">
					{joinDate}
				</Text>
			</div>

			{/* Status information row */}
			<div className="mb-m">
				{/* Label following consistent pattern */}
				<Text
					as="span"
					variant="body-small"
					className="font-medium text-neutral-60"
				>
					Status:
				</Text>
				{/* Status value with conditional styling */}
				{/* Uses cn utility to conditionally apply green color for online status */}
				{/* Default neutral color for offline, green accent for online */}
				<Text
					as="span"
					variant="body-small"
					className={cn(
						"ml-xs text-neutral-60", // Base styles: spacing and default color
						isOnline && "text-green-60", // Conditional green color when online
					)}
				>
					{/* Dynamic text content based on online status */}
					{isOnline ? "Online" : "Offline"}
				</Text>
			</div>
		</div>
	);
};
