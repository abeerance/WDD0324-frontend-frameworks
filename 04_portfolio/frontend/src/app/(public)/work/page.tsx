import { Grid, GridItem } from "@/components/layout/grid/grid";
import { Text } from "@/components/ui/text/text";
import { WorkList } from "@/components/work/work-list";
import { WorkSkeleton } from "@/components/work/work-skeleton";
import { Suspense } from "react";

export default function WorkPage() {
	return (
		<>
			<Grid className="-px-xs gap-l">
				<GridItem
					span={{ sm: 12, md: 8 }}
					offset={{ sm: 0, md: 2 }}
					className="flex flex-col gap-s mb-xl"
				>
					<Text variant="headline-1" as="h1" className="font-semibold">
						Works
					</Text>
					<Text variant="headline-5">
						A collection of projects spanning web development, design systems,
						and creative experiments. Each piece represents a challenge solved,
						a technology explored, or an idea brought to life through code
					</Text>
				</GridItem>
			</Grid>
			<Suspense fallback={<WorkSkeleton />}>
				<WorkList />
			</Suspense>
		</>
	);
}
