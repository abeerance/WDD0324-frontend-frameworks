import { cn } from "@/lib/utils";
import {
	type HTMLAttributes,
	type HTMLProps,
	type PropsWithChildren,
	forwardRef,
} from "react";

/**
 * Grid Component Props
 *
 * Extends standard HTMLDivElement attributes to allow all native div props
 * while providing type-safe className override
 */
interface GridProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
}

/**
 * Grid Component
 *
 * A 12-column grid layout system with automatic centering and max-width constraint.
 * Built on top of Tailwind's CSS Grid utilities.
 *
 * Features:
 * - 12-column grid system (industry standard, divisible by 2, 3, 4, 6)
 * - Max width of 1440px (common desktop max width)
 * - Automatic horizontal centering with mx-auto
 * - ForwardRef support for DOM access and animations
 *
 * Grid Structure:
 * - grid-cols-12: Creates 12 equal-width columns
 * - auto-rows-auto: Rows size to fit content
 * - grid-flow-row: Items flow in rows (left to right, top to bottom)
 * - max-w-[1440px]: Prevents grid from exceeding 1440px wide
 * - mx-auto: Centers grid horizontally
 *
 * Usage:
 * <Grid>
 *   <GridItem span={6}>Half width</GridItem>
 *   <GridItem span={6}>Half width</GridItem>
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, PropsWithChildren<GridProps>>(
	({ children, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={cn(
					"grid grid-cols-12 w-full max-w-[1440px] mx-auto auto-rows-auto grid-flow-row px-xs",
					className,
				)}
			>
				{children}
			</div>
		);
	},
);

Grid.displayName = "Grid";

/**
 * Responsive Breakpoint Values
 *
 * Defines column span or offset at different viewport sizes
 * Uses Tailwind's default breakpoints:
 * - sm: 640px and above (small tablets, phones)
 * - md: 768px and above (tablets, small desktops)
 * - lg: 1024px and above (desktops, large screens)
 *
 * These breakpoints are defined in Tailwind CSS core configuration.
 * Tailwind uses min-width media queries (mobile-first approach):
 * - Base styles apply to all screen sizes
 * - sm: applies from 640px and up
 * - md: applies from 768px and up (overrides sm)
 * - lg: applies from 1024px and up (overrides md)
 *
 * Example responsive behavior:
 * { sm: 12, md: 6, lg: 4 }
 * - Mobile (< 640px): Uses sm (12 columns - full width)
 * - Tablet (640px - 767px): Uses sm (12 columns - full width)
 * - Tablet (768px - 1023px): Uses md (6 columns - half width)
 * - Desktop (1024px+): Uses lg (4 columns - third width)
 */
type GridBreapointValues = {
	sm?: number; // 640px+
	md?: number; // 768px+
	lg?: number; // 1024px+
};

/**
 * GridItem Component Props
 *
 * Omits 'span' from HTMLProps<HTMLDivElement> because we define our own
 * custom 'span' prop that conflicts with the native span element
 */
interface GridItemProps extends Omit<HTMLProps<HTMLDivElement>, "span"> {
	/**
	 * Column span - how many columns this item occupies
	 *
	 * Can be:
	 * - Single number: applies to all breakpoints (e.g., span={6})
	 * - Responsive object: different values per breakpoint (e.g., span={{ sm: 12, md: 6, lg: 4 }})
	 *
	 * Values range from 1-12:
	 * - span={12}: Full width (all 12 columns)
	 * - span={6}: Half width (6 out of 12 columns)
	 * - span={4}: Third width (4 out of 12 columns)
	 * - span={3}: Quarter width (3 out of 12 columns)
	 *
	 * Default: 12 (full width)
	 */
	span?: number | GridBreapointValues;

	/**
	 * Column offset - how many columns to skip before starting
	 *
	 * Can be:
	 * - Single number: applies to all breakpoints (e.g., offset={2})
	 * - Responsive object: different values per breakpoint (e.g., offset={{ sm: 0, md: 2 }})
	 *
	 * Values range from 0-11:
	 * - offset={0}: No offset, start at first column
	 * - offset={2}: Skip 2 columns, start at column 3
	 * - offset={6}: Skip 6 columns, start at column 7 (right half)
	 *
	 * Useful for:
	 * - Centering content (e.g., span={6} offset={3} centers a 6-column item)
	 * - Creating asymmetric layouts
	 * - Aligning content to specific grid positions
	 *
	 * Default: 0 (no offset)
	 */
	offset?: number | GridBreapointValues;

	className?: string;
}

/**
 * GridItem Component
 *
 * Individual grid item that spans a specified number of columns.
 * Supports responsive breakpoints for adaptive layouts.
 *
 * How it works:
 * 1. Determines if span/offset are single numbers or responsive objects
 * 2. Builds appropriate Tailwind classes based on breakpoint values
 * 3. Combines all classes with cn() utility for proper merging
 *
 * Class Generation Logic:
 * - Single number: Generates base class (e.g., span={6} → "col-span-6")
 * - Responsive object: Generates prefixed classes for each breakpoint
 *   (e.g., span={{ sm: 12, md: 6 }} → "col-span-12 md:col-span-6")
 *
 * Mobile-First Approach:
 * - sm value becomes the base (no prefix)
 * - md and lg values override at their breakpoints
 * - This follows Tailwind's mobile-first philosophy
 *
 * Usage Examples:
 *
 * // Fixed span across all screens
 * <GridItem span={6}>Always half width</GridItem>
 *
 * // Responsive span
 * <GridItem span={{ sm: 12, md: 6, lg: 4 }}>
 *   Full on mobile, half on tablet, third on desktop
 * </GridItem>
 *
 * // With offset
 * <GridItem span={6} offset={3}>
 *   Centered 6-column item
 * </GridItem>
 *
 * // Complex responsive layout
 * <GridItem
 *   span={{ sm: 12, md: 8, lg: 6 }}
 *   offset={{ sm: 0, md: 2, lg: 3 }}
 * >
 *   Responsive width and centering
 * </GridItem>
 */
export const GridItem = forwardRef<
	HTMLDivElement,
	PropsWithChildren<GridItemProps>
>(({ span = 12, offset = 0, className, children, ...props }, ref) => {
	// Arrays to collect all generated Tailwind classes
	const spanClasses = [];
	const offsetClasses = [];

	/**
	 * Handle span values
	 *
	 * Single number (e.g., span={6}):
	 * - Generates one class: "col-span-6"
	 * - Applies to all screen sizes
	 *
	 * Responsive object (e.g., span={{ sm: 12, md: 6 }}):
	 * - sm becomes base class: "col-span-12"
	 * - md adds prefixed class: "md:col-span-6"
	 * - lg adds prefixed class: "lg:col-span-4"
	 * - Tailwind's cascade handles overrides at each breakpoint
	 */
	if (typeof span === "number") {
		// Single span value for all breakpoints
		spanClasses.push(getSpanClass(span));
	} else {
		// Responsive span values
		// sm is the base (mobile-first)
		if (span.sm !== undefined) spanClasses.push(getSpanClass(span.sm));
		// md overrides sm at 768px+
		if (span.md !== undefined) spanClasses.push(getMdSpanClass(span.md));
		// lg overrides md at 1024px+
		if (span.lg !== undefined) spanClasses.push(getLgSpanClass(span.lg));
	}

	/**
	 * Handle offset values
	 *
	 * Similar logic to span, but:
	 * - Only adds class if offset > 0 (no point in "start at column 1")
	 * - Uses col-start-X instead of col-span-X
	 * - col-start-3 means "start at column 3" (skip 2 columns)
	 */
	if (typeof offset === "number") {
		// Single offset value for all breakpoints
		if (offset > 0) offsetClasses.push(getOffsetClass(offset));
	} else {
		// Responsive offset values
		if (offset.sm !== undefined && offset.sm > 0)
			offsetClasses.push(getOffsetClass(offset.sm));
		if (offset.md !== undefined && offset.md > 0)
			offsetClasses.push(getMdOffsetClass(offset.md));
		if (offset.lg !== undefined && offset.lg > 0)
			offsetClasses.push(getLgOffsetClass(offset.lg));
	}

	return (
		<div
			ref={ref}
			{...props}
			className={cn(
				spanClasses.join(" "), // Join all span classes
				offsetClasses.join(" "), // Join all offset classes
				className, // User's custom classes override
			)}
		>
			{children}
		</div>
	);
});

GridItem.displayName = "GridItem";

/**
 * Helper Functions: Span Class Mappers
 *
 * These functions map column numbers (1-12) to Tailwind utility classes.
 * They exist because Tailwind requires exact class names at build time
 * (dynamic strings like `col-span-${span}` don't work with PurgeCSS).
 *
 * Why we need explicit mappings:
 * - Tailwind scans your code for class names at build time
 * - It only includes classes it finds in the final CSS bundle
 * - String interpolation is invisible to the scanner
 * - Therefore, we explicitly list all possible classes
 *
 * This ensures Tailwind includes all col-span-* classes in the build.
 */

/**
 * Get base span class (no breakpoint prefix)
 * Used for: Single number values OR sm breakpoint values
 * Example: span={6} → "col-span-6"
 * Example: span={{ sm: 6 }} → "col-span-6"
 */
function getSpanClass(span: number): string {
	const spanMap: Record<number, string> = {
		1: "col-span-1", // 1/12 width (~8.33%)
		2: "col-span-2", // 2/12 width (~16.67%)
		3: "col-span-3", // 3/12 width (25%)
		4: "col-span-4", // 4/12 width (~33.33%)
		5: "col-span-5", // 5/12 width (~41.67%)
		6: "col-span-6", // 6/12 width (50%)
		7: "col-span-7", // 7/12 width (~58.33%)
		8: "col-span-8", // 8/12 width (~66.67%)
		9: "col-span-9", // 9/12 width (75%)
		10: "col-span-10", // 10/12 width (~83.33%)
		11: "col-span-11", // 11/12 width (~91.67%)
		12: "col-span-12", // 12/12 width (100%)
	};
	return spanMap[span] || "col-span-1"; // Fallback to smallest if invalid
}

/**
 * Get md breakpoint span class (768px+)
 * Used for: md breakpoint values
 * Example: span={{ md: 6 }} → "md:col-span-6"
 *
 * This overrides the base span class at 768px and above
 */
function getMdSpanClass(span: number): string {
	const spanMap: Record<number, string> = {
		1: "md:col-span-1",
		2: "md:col-span-2",
		3: "md:col-span-3",
		4: "md:col-span-4",
		5: "md:col-span-5",
		6: "md:col-span-6",
		7: "md:col-span-7",
		8: "md:col-span-8",
		9: "md:col-span-9",
		10: "md:col-span-10",
		11: "md:col-span-11",
		12: "md:col-span-12",
	};
	return spanMap[span] || "md:col-span-1";
}

/**
 * Get lg breakpoint span class (1024px+)
 * Used for: lg breakpoint values
 * Example: span={{ lg: 4 }} → "lg:col-span-4"
 *
 * This overrides the md (and base) span class at 1024px and above
 */
function getLgSpanClass(span: number): string {
	const spanMap: Record<number, string> = {
		1: "lg:col-span-1",
		2: "lg:col-span-2",
		3: "lg:col-span-3",
		4: "lg:col-span-4",
		5: "lg:col-span-5",
		6: "lg:col-span-6",
		7: "lg:col-span-7",
		8: "lg:col-span-8",
		9: "lg:col-span-9",
		10: "lg:col-span-10",
		11: "lg:col-span-11",
		12: "lg:col-span-12",
	};
	return spanMap[span] || "lg:col-span-1";
}

/**
 * Helper Functions: Offset Class Mappers
 *
 * Offset works differently than span:
 * - Span: "occupy X columns" (col-span-X)
 * - Offset: "start at column Y" (col-start-Y)
 *
 * Offset calculation:
 * - offset={1} → col-start-2 (skip column 1, start at column 2)
 * - offset={2} → col-start-3 (skip columns 1-2, start at column 3)
 * - offset={6} → col-start-7 (skip columns 1-6, start at column 7)
 *
 * This is why the value is always offset + 1 in the class name.
 *
 * Centering example:
 * <GridItem span={6} offset={3}>
 *   - Spans 6 columns
 *   - Starts at column 4 (offset 3)
 *   - Occupies columns 4-9
 *   - Perfectly centered in 12-column grid
 * </GridItem>
 */

/**
 * Get base offset class (no breakpoint prefix)
 * Used for: Single number values OR sm breakpoint values
 * Example: offset={3} → "col-start-4"
 */
function getOffsetClass(offset: number): string {
	const offsetMap: Record<number, string> = {
		1: "col-start-2", // Start at column 2 (skip 1)
		2: "col-start-3", // Start at column 3 (skip 2)
		3: "col-start-4", // Start at column 4 (skip 3)
		4: "col-start-5", // Start at column 5 (skip 4)
		5: "col-start-6", // Start at column 6 (skip 5)
		6: "col-start-7", // Start at column 7 (skip 6)
		7: "col-start-8", // Start at column 8 (skip 7)
		8: "col-start-9", // Start at column 9 (skip 8)
		9: "col-start-10", // Start at column 10 (skip 9)
		10: "col-start-11", // Start at column 11 (skip 10)
		11: "col-start-12", // Start at column 12 (skip 11)
	};
	return offsetMap[offset] || ""; // Return empty string if 0 or invalid
}

/**
 * Get md breakpoint offset class (768px+)
 * Used for: md breakpoint values
 * Example: offset={{ md: 2 }} → "md:col-start-3"
 */
function getMdOffsetClass(offset: number): string {
	const offsetMap: Record<number, string> = {
		1: "md:col-start-2",
		2: "md:col-start-3",
		3: "md:col-start-4",
		4: "md:col-start-5",
		5: "md:col-start-6",
		6: "md:col-start-7",
		7: "md:col-start-8",
		8: "md:col-start-9",
		9: "md:col-start-10",
		10: "md:col-start-11",
		11: "md:col-start-12",
	};
	return offsetMap[offset] || "";
}

/**
 * Get lg breakpoint offset class (1024px+)
 * Used for: lg breakpoint values
 * Example: offset={{ lg: 3 }} → "lg:col-start-4"
 */
function getLgOffsetClass(offset: number): string {
	const offsetMap: Record<number, string> = {
		1: "lg:col-start-2",
		2: "lg:col-start-3",
		3: "lg:col-start-4",
		4: "lg:col-start-5",
		5: "lg:col-start-6",
		6: "lg:col-start-7",
		7: "lg:col-start-8",
		8: "lg:col-start-9",
		9: "lg:col-start-10",
		10: "lg:col-start-11",
		11: "lg:col-start-12",
	};
	return offsetMap[offset] || "";
}
