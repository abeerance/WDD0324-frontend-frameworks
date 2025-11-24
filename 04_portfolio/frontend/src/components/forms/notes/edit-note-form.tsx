"use client";

import {
	updateNoteAction,
	uploadImageAction,
} from "@/actions/notes/edit-note-action";
import { TiptapEditor } from "@/components/tiptap/tiptap-editor";
import { Button } from "@/components/ui/button/button";
import { FormControl } from "@/components/ui/form/form-control";
import { FormField } from "@/components/ui/form/form-field";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormMessage } from "@/components/ui/form/form-message";
import { FormRoot } from "@/components/ui/form/form-root";
import { FormSubmit } from "@/components/ui/form/form-submit";
import { ImageUpload } from "@/components/ui/image-upload/image-upload";
import { Input } from "@/components/ui/input/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select/select";
import { Tag } from "@/components/ui/tag/tag";
import { Textarea } from "@/components/ui/text-area/text-area";
import { useMainVisualUpload } from "@/hooks/use-main-visual-upload";
import { usePendingImages } from "@/hooks/use-pending.image";
import type { Note } from "@/lib/api/notes/notes";
import { replaceImageReferences } from "@/lib/utils/note-form";
import {
	type EditNoteFormData,
	editNoteSchema,
} from "@/schemas/note/edit-note";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditNoteFormProps {
	note: Note;
}

export default function EditNoteForm({ note }: EditNoteFormProps) {
	const router = useRouter();

	// Parse content from JSON string to JSONContent (this is only needed with TipTap)
	const parsedContent: JSONContent =
		typeof note.content === "string" ? JSON.parse(note.content) : note.content;

	// Initialize React Hook Form with Zod validation and existing note data
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = useForm<EditNoteFormData>({
		resolver: zodResolver(editNoteSchema),
		defaultValues: {
			title: note.title,
			lead: note.lead,
			content: parsedContent,
			main_visual_id: note.main_visual.id,
			tags: note.tags.map((tag) => tag.name),
		},
	});

	const content = watch("content");
	const selectedTags = watch("tags");

	const { selectedFile, previewUrl, handleImageSelect, handleImageRemove } =
		useMainVisualUpload({ setValue, initialPreviewUrl: note.main_visual.url });

	const { pendingImages, handleEditorImageSelect } = usePendingImages(content);

	/**
	 * Form Submission Handler
	 *
	 * Flow:
	 * 1. Upload new main visual image (if selected)
	 * 2. Upload all new editor images from pendingImages
	 * 3. Replace temporary IDs with uploaded image IDs
	 * 4. Submit updated note data to backend
	 */
	const onSubmit = async (data: EditNoteFormData) => {
		try {
			// Step 1: Upload new main visual image if changed
			if (selectedFile) {
				const formData = new FormData();
				formData.append("files[]", selectedFile);

				const uploadResult = await uploadImageAction(formData);

				if (!uploadResult.success || !uploadResult.images) {
					throw new Error(uploadResult.error || "Failed to upload image");
				}

				data.main_visual_id = uploadResult.images[0].id;
			}

			// Step 2: Upload all new editor images and map temp IDs to real IDs and URLs  (ONLY FOR TIP TAP)
			const imageIdMap = new Map<string, { id: number; url: string }>();

			for (const [tempId, file] of pendingImages.entries()) {
				const formData = new FormData();
				formData.append("files[]", file);

				const uploadResult = await uploadImageAction(formData);

				if (!uploadResult.success || !uploadResult.images) {
					throw new Error(
						uploadResult.error || "Failed to upload editor image",
					);
				}

				imageIdMap.set(tempId, {
					id: uploadResult.images[0].id,
					url: uploadResult.images[0].url,
				});
			}

			// Step 3: Replace temporary IDs with real image IDs ONLY if there are new images (ONLY FOR TIP TAP)
			if (imageIdMap.size > 0) {
				const updatedContent = replaceImageReferences(data.content, imageIdMap);
				data.content = updatedContent;
			}

			// Step 4: Submit updated note to backend
			const result = await updateNoteAction(note.id, data);

			if (!result.success) {
				const error = result.error || "Failed to update note";
				toast.error(error);
				return;
			}

			if (result.note) {
				toast.success("Note updated successfully");
				router.push(`/notes/${result.note.slug}`);
			}
		} catch (err) {
			const error =
				err instanceof Error ? err.message : "Failed to update note";
			toast.error(error);
		}
	};

	return (
		<FormRoot onSubmit={handleSubmit(onSubmit)} className="mb-3xl">
			{/* Title Field */}
			<FormField name="title" serverInvalid={!!errors.title}>
				<FormLabel>Title</FormLabel>
				{errors.title && <FormMessage>{errors.title.message}</FormMessage>}
				<FormControl>
					<Input
						type="text"
						placeholder="Enter note title"
						{...register("title")}
					/>
				</FormControl>
			</FormField>
			{/* Lead / Summary field */}
			<FormField name="lead" serverInvalid={!!errors.lead}>
				<FormLabel>Lead</FormLabel>
				{errors.lead && <FormMessage>{errors.lead.message}</FormMessage>}
				<FormControl>
					<Textarea
						rows={4}
						placeholder="Brief summary of your note"
						{...register("lead")}
					/>
				</FormControl>
			</FormField>
			{/* Main Visual Image Upload */}
			<FormField name="main_visual_id" serverInvalid={!!errors.main_visual_id}>
				<FormLabel>Main Visual</FormLabel>
				{errors.main_visual_id && (
					<FormMessage>{errors.main_visual_id.message}</FormMessage>
				)}
				<FormControl>
					<ImageUpload
						onSelect={handleImageSelect}
						previewUrl={previewUrl}
						onRemove={handleImageRemove}
					/>
				</FormControl>
			</FormField>
			{/* Rich Text Editor with Image Support */}
			<FormField name="content" serverInvalid={!!errors.content}>
				<FormLabel>Content</FormLabel>
				{errors.content && <FormMessage>Content is required</FormMessage>}
				<FormControl>
					<TiptapEditor
						content={content}
						onChange={(json) =>
							setValue("content", json, { shouldValidate: true })
						}
						onImageSelect={handleEditorImageSelect}
						placeholder="Start writing your note..."
					/>
				</FormControl>
			</FormField>
			{/* Rich Text Editor with Image Support */}
			<FormField name="content" serverInvalid={!!errors.content}>
				<FormLabel>Content</FormLabel>
				{errors.content && <FormMessage>Content is required</FormMessage>}
				<FormControl>
					<TiptapEditor
						content={content}
						onChange={(json) =>
							setValue("content", json, { shouldValidate: true })
						}
						onImageSelect={handleEditorImageSelect}
						placeholder="Start writing your note..."
					/>
				</FormControl>
			</FormField>

			{/* Tags Selection */}
			<FormField name="tags" serverInvalid={!!errors.tags}>
				<FormLabel>Tags</FormLabel>
				{errors.tags && <FormMessage>{errors.tags.message}</FormMessage>}
				<FormControl>
					<Select
						value={selectedTags[0] || ""}
						onValueChange={(value) =>
							setValue("tags", [value], { shouldValidate: true })
						}
					>
						<SelectTrigger>
							{selectedTags[0] ? (
								<Tag name={selectedTags[0]} />
							) : (
								<SelectValue placeholder="Select a tag" />
							)}
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="thoughts">Thoughts</SelectItem>
							<SelectItem value="project">Project</SelectItem>
							<SelectItem value="play">Play</SelectItem>
						</SelectContent>
					</Select>
				</FormControl>
			</FormField>
			{/* Submit and Cancel Buttons */}
			<div className="flex gap-m">
				<FormSubmit buttonClassName="flex-1" disabled={isSubmitting}>
					{isSubmitting ? "Updating..." : "Update Note"}
				</FormSubmit>
				<Button
					type="button"
					onClick={() => router.back()}
					disabled={isSubmitting}
					className="flex-1 bg-secondary-700 hover:bg-secondary-600"
				>
					Cancel
				</Button>
			</div>
		</FormRoot>
	);
}
