import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface TagProps extends ComponentPropsWithoutRef<"span"> {
	name: string;
}

/**
 * Tag Component
 *
 * Color-coded category pill that visually identifies content types
 *
 * Color mapping based on tag name:
 * - "thoughts" → primary-500 (sage green) - Personal reflections and learnings
 * - "project" → secondary-500 (dusty rose) - Technical projects and builds
 * - "play" → accent-500 (mustard yellow) - Experimental and fun content
 *
 * Styling:
 * - Rounded pill shape with compact padding (px-xs py-3xs)
 * - Small uppercase text (body-small) for visual hierarchy
 * - Bold font weight for emphasis
 * - Light background text (background-50) for contrast against colored backgrounds
 *
 * Extensibility:
 * - Accepts all standard span attributes via ComponentPropsWithoutRef
 * - className can be passed to override or extend default styles
 * - Automatically applies color based on name prop
 *
 * @param name - Tag category name (determines color)
 * @param className - Optional additional CSS classes
 * @param props - Any other valid span HTML attributes
 */
export const Tag = ({ name, className, ...props }: TagProps) => {
	// Determine background color based on tag name
	// Defaults to accent color if name doesn't match known categories
	const colorClass =
		name === "thoughts"
			? "bg-primary-500"
			: name === "project"
				? "bg-secondary-500"
				: "bg-accent-500";

	return (
		<span
			className={cn(
				"rounded-full text-body-small font-bold uppercase text-background-50 px-xs pb-3xs pt-2xs inline-flex items-center justify-center",
				colorClass,
				className,
			)}
			{...props}
		>
			{name}
		</span>
	);
};
