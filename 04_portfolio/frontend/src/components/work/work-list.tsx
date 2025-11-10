import { Grid, GridItem } from "@/components/layout/grid/grid";
import { getProjects } from "@/lib/api/work/work";
import { WorkCard } from "./work-card";

/**
 * WorkList Component
 *
 * Displays all projects in a responsive grid with alternating column widths.
 * Creates visual rhythm through asymmetric layout on tablet/desktop sizes.
 */
export async function WorkList() {
	// Fetch all projects from API
	const projects = await getProjects();

	// Handle empty state
	if (!projects) {
		return <div>No projects found</div>;
	}

	return (
		<Grid className="-px-xs gap-xl">
			{projects.data.map((project, index) => {
				// Calculate row position (groups of 2 items)
				// Math.floor(index / 2) gives row number: 0,0,1,1,2,2...
				// % 2 determines if row is even (0) or odd (1)
				const isEvenRow = Math.floor(index / 2) % 2 === 0;

				// Determine position within the pair
				// index % 2 gives: 0 (first), 1 (second), 0 (first), 1 (second)...
				const isFirstInPair = index % 2 === 0;

				// Calculate responsive column span for asymmetric layout
				// Creates alternating 5/7 pattern that flips each row:
				// Row 0: 5 cols, 7 cols
				// Row 1: 7 cols, 5 cols
				// Row 2: 5 cols, 7 cols (repeats)
				let span: number;
				if (isEvenRow) {
					span = isFirstInPair ? 5 : 7;
				} else {
					span = isFirstInPair ? 7 : 5;
				}

				return (
					<GridItem key={project.id} span={{ sm: 12, md: span }}>
						<WorkCard project={project} />
					</GridItem>
				);
			})}
		</Grid>
	);
}
