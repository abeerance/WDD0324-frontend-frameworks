import { Grid, GridItem } from "../layout/grid/grid";

const skeletonIds = Array.from(
	{ length: 9 },
	() => `skeleton-${crypto.randomUUID()}`,
);

export function NotesSkeleton() {
	return (
		<Grid className="-px-xs gap-l">
			{skeletonIds.map((id) => (
				<GridItem key={id} span={{ sm: 12, md: 6, lg: 4 }}>
					<div className="shadow-lg rounded-lg overflow-hidden animate-pulse">
						<div className="w-full bg-gray-300 aspect-[1.618/1]" />
						<div className="p-s flex flex-col gap-xs">
							<div className="h-[var(--text-headline-5--line-height)] bg-gray-300 rounded w-3/4" />
							<div className="h-[var(--text-headline-5--line-height)] bg-gray-300 rounded" />
							<div className="h-[var(--text-headline-5--line-height)] bg-gray-300 rounded" />
							<div className="h-[var(--text-headline-5--line-height)] bg-gray-300 rounded w-5/6" />
							<div className="flex gap-2">
								<div className="h-6 bg-gray-300 rounded w-16" />
							</div>
						</div>
					</div>
				</GridItem>
			))}
		</Grid>
	);
}
