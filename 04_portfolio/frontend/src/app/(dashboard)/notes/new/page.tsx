"use client";

import { TiptapEditor } from "@/components/tiptap/tiptap-editor";
import { ImageUpload } from "@/components/ui/image-upload/image-upload";

export default function CreateNotePage() {
	return (
		<div>
			asdasdasda
			<TiptapEditor />
			<ImageUpload onSelect={() => console.log} />
		</div>
	);
}
