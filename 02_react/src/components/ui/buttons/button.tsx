"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * Interface for Button component props
 *
 * Extends ButtonHTMLAttributes to inherit all native button properties:
 * - Event handlers: onClick, onMouseOver, onFocus, etc.
 * - Accessibility: aria-label, aria-describedby, role, etc.
 * - Form properties: disabled, form, formAction, etc.
 * - Standard HTML attributes: id, data-*, className, etc.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Visual style variant for the button
	 * - primary: Main call-to-action, cyan background
	 * - secondary: Secondary action, amber background
	 * - ghost: Text-only style with underline, no background
	 * - destructive: Dangerous actions, red background for warnings/deletions
	 */
	variant?: "primary" | "secondary" | "ghost" | "destructive";
}

/**
 * Reusable Button component with consistent styling and behavior
 *
 * Features:
 * - Multiple visual variants for different use cases
 * - Accessible by default (proper button semantics)
 * - Fully customizable via className prop
 * - Inherits all native button functionality
 */
export const Button = ({
	variant = "primary", // Visual style variant
	children, // Button content (text, icons, etc.)
	type = "button", // Default to "button" to prevent form submission
	className, // Additional CSS classes for customization
	...props // All other button props (onClick, disabled, etc.)
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(
				// Base styles applied to all button variants
				"rounded-md cursor-pointer inline-flex items-center justify-center px-s py-xs transition-all duration-300 text-headline-5 font-semibold",

				// Primary variant: Main call-to-action button
				// Cyan background with opacity for subtle transparency
				variant === "primary" &&
					"bg-cyan-900/90 text-gray-100 hover:bg-cyan-900/75",

				// Secondary variant: Secondary actions
				// Amber background, often used for less important actions
				variant === "secondary" &&
					"bg-amber-700/90 text-gray-100 hover:bg-amber-700/75",

				// Ghost variant: Minimal style for subtle actions
				// No background, just underlined text
				variant === "ghost" && "text-gray-900 underline",

				// Destructive variant: Dangerous/warning actions
				// Red background to signal caution (delete, remove, etc.)
				variant === "destructive" &&
					"bg-red-500/90 text-gray-100 hover:bg-red-700/75",

				// Custom classes passed via props (highest specificity)
				className,
			)}
			{...props} // Spread all remaining props to native button element
		>
			{children}
		</button>
	);
};
