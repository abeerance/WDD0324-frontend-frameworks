import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * TextLink Component
 *
 * A button styled to look like a text link for accessibility and functionality.
 *
 * WHY A BUTTON INSTEAD OF <a>?
 * - Used for in-page actions (like toggling forms) rather than navigation
 * - Doesn't navigate to a new URL, so semantically it's a button
 * - Better accessibility: screen readers announce it correctly as an action
 * - Prevents default link behavior (no URL changes, no browser history)
 *
 * PROPS:
 * - Extends all native button props (onClick, disabled, aria-*, etc.)
 * - ComponentPropsWithoutRef ensures no 'ref' conflicts with prop spreading
 * - className can override or extend default styles via cn() utility
 *
 * USAGE EXAMPLE:
 * <TextLink onClick={toggleForm}>Login now!</TextLink>
 */
interface TextLinkProps extends ComponentPropsWithoutRef<"button"> {
	children: ReactNode;
}

export const TextLink = ({ children, className, ...props }: TextLinkProps) => {
	return (
		<button
			type="button" // Explicit type="button" prevents form submission if inside <form>
			className={cn("text-body font-semibold cursor-pointer", className)} // cn() merges default + custom classes
			{...props} // Spreads all remaining props (onClick, disabled, aria-label, etc.)
		>
			{children}
		</button>
	);
};
