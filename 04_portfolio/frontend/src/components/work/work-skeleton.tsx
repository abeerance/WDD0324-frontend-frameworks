import { Grid, GridItem } from "../layout/grid/grid";

/**
 * Number of skeleton items to render
 * Represents loading state for work/project grid
 */
const SKELETON_COUNT = 10;

/**
 * WorkSkeleton Component
 *
 * Displays loading skeleton for work/project grid with alternating layout.
 *
 * Layout pattern (alternates every 2 items):
 * Row 1: [5 cols] [7 cols]
 * Row 2: [7 cols] [5 cols]
 * Row 3: [5 cols] [7 cols]
 * ...repeating
 *
 * This creates visual rhythm and prevents monotonous grid appearance.
 * On mobile, all items are full width (12 cols).
 */
export const WorkSkeleton = () => {
	const skeletonCount = SKELETON_COUNT;

	/**
	 * Generate unique keys for each skeleton item
	 * Using index-based keys here is safe because:
	 * - Items never reorder
	 * - Items never get added/removed during render
	 * - This is purely a loading state
	 */
	const skeletonItems = Array.from(
		{ length: skeletonCount },
		(_, index) => `skeleton-${index}`,
	);

	return (
		<Grid className="-px-xs gap-xl">
			{skeletonItems.map((key, index) => {
				/**
				 * Determine which "row pair" this item belongs to
				 * Each pair contains 2 items (index 0-1, 2-3, 4-5, etc.)
				 *
				 * Math.floor(index / 2) gives us the pair number: 0, 0, 1, 1, 2, 2...
				 * % 2 === 0 checks if pair number is even
				 *
				 * Examples:
				 * - index 0: floor(0/2) = 0, 0 % 2 = 0 → isEvenRow = true
				 * - index 1: floor(1/2) = 0, 0 % 2 = 0 → isEvenRow = true
				 * - index 2: floor(2/2) = 1, 1 % 2 = 1 → isEvenRow = false
				 * - index 3: floor(3/2) = 1, 1 % 2 = 1 → isEvenRow = false
				 */
				const isEvenRow = Math.floor(index / 2) % 2 === 0;

				/**
				 * Check if this is the first item in its pair (left side)
				 * index % 2 === 0 means even indices (0, 2, 4, 6...)
				 */
				const isFirstInPair = index % 2 === 0;

				/**
				 * Calculate column span based on position and row
				 *
				 * Pattern:
				 * Even rows: First item = 5 cols, Second item = 7 cols
				 * Odd rows:  First item = 7 cols, Second item = 5 cols
				 *
				 * This creates alternating asymmetric layout
				 */
				let span: number;
				if (isEvenRow) {
					span = isFirstInPair ? 5 : 7;
				} else {
					span = isFirstInPair ? 7 : 5;
				}

				return (
					<GridItem key={key} span={{ sm: 12, md: span }}>
						{/* 
							Skeleton card container
							- Fixed height (400px mobile, 500px desktop)
							- Pulse animation for loading effect
							- Rounded corners and shadow matching real cards
						*/}
						<div className="relative block overflow-hidden rounded-2xl shadow-lg w-full h-[400px] md:h-[500px] bg-background-100 animate-pulse">
							{/* 
								Content overlay (mimics project title/description position)
								Positioned absolutely in top-right corner
							*/}
							<div className="absolute z10 p-l right-0 flex flex-col items-end gap-m">
								{/* Title skeleton (2 lines) */}
								<div className="flex flex-col items-end gap-2">
									<div className="h-8 w-64 bg-background-50 rounded" />
									<div className="h-8 w-64 bg-background-50 rounded" />
								</div>
								{/* Description skeleton (1 line, slightly narrower) */}
								<div className="h-6 w-56 bg-background-50 rounded" />
							</div>
						</div>
					</GridItem>
				);
			})}
		</Grid>
	);
};
