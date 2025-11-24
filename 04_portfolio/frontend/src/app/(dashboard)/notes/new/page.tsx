import CreateNoteForm from "@/components/forms/notes/create-note-form";
import { Text } from "@/components/ui/text/text";

export default async function CreateNoteFormPage() {
	// This is another way to ensure that only user that are authenticated have the privilege to access this page
	// const session = await auth();

	// if (!session || !session.user) {
	// 	redirect("/admin");
	// }

	return (
		<div className="flex flex-col gap-m mt-s">
			<Text variant="headline-1" className="font-semibold">
				Create new Note
			</Text>
			<CreateNoteForm />
		</div>
	);
}
