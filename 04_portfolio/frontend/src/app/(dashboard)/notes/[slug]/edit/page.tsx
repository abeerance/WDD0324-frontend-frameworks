import EditNoteForm from "@/components/forms/notes/edit-note-form";
import { Text } from "@/components/ui/text/text";
import { fetchApi } from "@/lib/api/api-fetch";
import type { Note } from "@/lib/api/notes/notes";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

interface EditNotePageProps {
	params: Promise<{ slug: string }>;
}

/* 
 API Response structure for a note from Laravel backend
*/
interface GetNoteResponse {
	data: Note[];
}

export default async function EditNotePage({ params }: EditNotePageProps) {
	const session = await auth();
	const { slug } = await params;

	const token = session?.user.accessToken;

	if (!token) {
		redirect("/admin");
	}

	// Fetch the note by slug from Laravel API
	const response = await fetchApi<GetNoteResponse>(`notes?slug=${slug}`);

	if (response.error || !response.data) {
		notFound();
	}

	const notes = response.data.data;

	// check if note exists
	if (!notes || notes.length === 0) {
		notFound();
	}

	// get the single note
	const note = notes[0];

	// if the user is not the creator of the note, redirect the user to their dashboard
	if (note.user_id !== Number(session.user.id)) {
		redirect("/dashboard");
	}

	return (
		<div className="flex flex-col gap-m mt-s">
			<Text variant="headline-1" className="font-semibold">
				Edit note
			</Text>
			<EditNoteForm note={note} />
		</div>
	);
}
