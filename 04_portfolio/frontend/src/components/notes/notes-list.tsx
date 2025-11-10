import { type Note, getNotes } from "@/lib/api/notes/notes";
import { Grid, GridItem } from "../layout/grid/grid";
import { NoteCard } from "./note-card";

export async function NotesList() {
	// Fetch notes on server during page generation
	const notes = await getNotes();

	// Early return if no data available
	if (!notes) {
		return <div>No notes found</div>;
	}

	return (
		<Grid className="-px-xs gap-l">
			{notes.data.map((note: Note) => (
				<GridItem key={note.id} span={{ sm: 12, md: 6, lg: 4 }}>
					{/* Note card wrapper - entire card is clickable */}
					<NoteCard note={note} />
				</GridItem>
			))}
		</Grid>
	);
}
