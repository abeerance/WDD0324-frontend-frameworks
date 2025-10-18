"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Reusable Input component with design system styling
 *
 * Features:
 * - Uses OKLCH colors for consistent appearance
 * - Responsive to validation states (invalid/valid)
 * - Focus states with custom ring colors
 * - Disabled states with reduced opacity
 * - Placeholder styling
 *
 * Color Breakdown:
 * - bg-background-10: Very light background (almost white)
 * - border-background-300: Light gray border
 * - text-foreground-900: Very dark text for readability
 * - placeholder:text-foreground-400: Medium gray placeholder
 *
 * State Colors:
 * - Focus: border-primary-500 + ring-primary-500/20 (sage green)
 * - Invalid: border-secondary-500 + ring-secondary-500/20 (dusty rose)
 * - Valid: border-primary-500 (sage green)
 */

export const Input = ({
	className,
	type,
	...props
}: ComponentProps<"input">) => {
	return (
		<input
			type={type}
			className={cn(
				// Base styles - applied to all inputs
				"w-full min-w-0 rounded-md border px-s py-2xs transition-all duration-300 ease-[--ease-out-quart] outline-none",

				// Typography
				"text-body font-cabinet-grotesk",

				// Colors - using our design system
				"bg-background-10 border-background-300 text-foreground-900",
				"placeholder:text-foreground-50",

				// Focus state - ring effect with primary color
				"focus-visible:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-500/20",

				// Invalid state - red ring and border when validation fails
				"aria-invalid:border-secondary-500 aria-invalid:ring-4 aria-invalid:ring-secondary-500/20",

				// Valid state - green ring and border when validation passes
				"aria-[invalid=false]:border-primary-500",

				// Disabled state
				"disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",

				// File input specific styling
				"file:inline-flex file:border-0 file:bg-transparent file:text-body file:font-medium file:text-foreground-800",

				// Selection styling
				"selection:bg-primary-200 selection:text-primary-900",

				// Shadow for depth
				"shadow-sm",

				// Prevent browser extension overflow
				"relative z-0",

				// Custom classes from props
				className,
			)}
			data-1p-ignore
			data-lpignore="true"
			{...props}
		/>
	);
};
