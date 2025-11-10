import { Grid, GridItem } from "@/components/layout/grid/grid";

/**
 * WorkDetailLoadingPage Component
 *
 * Loading skeleton for work detail page that matches the actual layout structure.
 *
 * Mimics the real page sections:
 * 1. Title (headline-1)
 * 2. Metadata row (Timeline + Team)
 * 3. Main visual/hero image (golden ratio aspect)
 * 4. Overview section (heading + lead text)
 *
 * Uses CSS custom properties for accurate height matching
 * and maintains the same grid layout as the actual page.
 */
export default function WorkDetailLoadingPage() {
	return (
		<Grid className="-px-xs gap-l animate-pulse">
			{/* Header section: Title + Metadata */}
			<GridItem span={{ sm: 12, md: 8 }} offset={{ sm: 0, md: 2 }}>
				{/* Title skeleton - matches headline-1 height */}
				<div className="h-[var(--text-headline-1--line-height)] bg-background-100 rounded mb-m w-3/4" />

				{/* Metadata row: Timeline and Team side by side */}
				<div className="flex gap-xl mb-m">
					{/* Timeline section */}
					<div className="flex flex-col gap-xs">
						{/* "TIMELINE" label */}
						<div className="h-[var(--text-body-small--line-height)] bg-background-100 rounded w-16" />
						{/* Date value */}
						<div className="h-[var(--text-body-small--line-height)] bg-background-100 rounded w-32" />
					</div>

					{/* Team section */}
					<div className="flex flex-col gap-xs">
						{/* "TEAM" label */}
						<div className="h-[var(--text-body-small--line-height)] bg-background-100 rounded w-12" />
						{/* Name value */}
						<div className="h-[var(--text-body-small--line-height)] bg-background-100 rounded w-28" />
					</div>
				</div>
			</GridItem>

			{/* Main visual section - Hero image with golden ratio aspect */}
			<GridItem span={{ sm: 12, md: 10 }} offset={{ sm: 0, md: 1 }}>
				<div className="relative w-full aspect-[1.618/1] rounded-2xl overflow-hidden mb-xs bg-background-100" />
			</GridItem>

			{/* Overview section - Heading + Lead text */}
			<GridItem span={{ sm: 12, md: 10 }} offset={{ sm: 0, md: 1 }}>
				{/* "Overview" heading */}
				<div className="h-[var(--text-headline-4--line-height)] bg-background-100 rounded mb-2xs w-32" />

				{/* Lead text (3 lines to mimic paragraph) */}
				<div className="flex flex-col gap-xs mb-2xs">
					<div className="h-[var(--text-body--line-height)] bg-background-100 rounded" />
					<div className="h-[var(--text-body--line-height)] bg-background-100 rounded" />
					<div className="h-[var(--text-body--line-height)] bg-background-100 rounded w-5/6" />
				</div>
			</GridItem>
		</Grid>
	);
}
