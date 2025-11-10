import { Grid, GridItem } from "@/components/layout/grid/grid";
import { NotesList } from "@/components/notes/notes-list";
import { NotesSkeleton } from "@/components/notes/notes-skeleton";
import { Text } from "@/components/ui/text/text";
import { Suspense } from "react";

/**
 * Notes listing page component
 * Server-rendered page displaying all notes in a responsive grid layout
 *
 * Layout:
 * - Hero section: Centered title and description (8 cols on md+)
 * - Notes grid: 1 column mobile, 2 tablet, 3 desktop
 *
 * Each card features:
 * - Golden ratio image (1.618:1)
 * - Title truncated to 1 line
 * - Lead text clamped to 3 lines
 * - Tag pills
 */
export default async function NotesPage() {
	return (
		<>
			{/* Hero section - centered title and description */}
			<Grid className="-px-xs gap-l">
				<GridItem
					span={{ sm: 12, md: 8 }} // Full width mobile, 8 cols on medium+
					offset={{ sm: 0, md: 2 }} // Center on medium+ screens
					className="flex flex-col gap-s mb-xl"
				>
					<Text variant="headline-1" as="h1" className="font-semibold">
						Notes
					</Text>
					<Text variant="headline-5">
						Here you'll find my technical experiments, design musings, and the
						occasional weekend of this as my public workshop— messy, honest, and
						always evolving.
					</Text>
				</GridItem>
			</Grid>
			<Suspense fallback={<NotesSkeleton />}>
				<NotesList />
			</Suspense>
		</>
	);
}
