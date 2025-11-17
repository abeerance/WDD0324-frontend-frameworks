"use client";

import {
	createNoteAction,
	uploadImageAction,
} from "@/actions/notes/create-note-action";
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
import {
	type CreateNoteFormData,
	createNoteSchema,
} from "@/schemas/note/create-note";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

/**
 * Create Note Form Component
 *
 * Handles note creation with:
 * - Basic fields (title, lead, tags)
 * - Main visual image upload
 * - Rich text editor with inline image support
 * - Image upload tracking and ID replacement before submission
 */
export default function CreateNoteForm() {
	const router = useRouter();

	// Main visual image state
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	/**
	 * Tracks images inserted in the editor before upload
	 * Key: temporary ID, Value: File object for upload on submit
	 */
	const [pendingImages, setPendingImages] = useState<Map<string, File>>(
		new Map(),
	);

	// Initialize React Hook Form with Zod validation
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = useForm<CreateNoteFormData>({
		resolver: zodResolver(createNoteSchema),
		defaultValues: {
			title: "",
			lead: "",
			content: {
				type: "doc",
				content: [],
			},
			main_visual_id: undefined,
			tags: [],
		},
	});

	const content = watch("content");
	const selectedTags = watch("tags");

	/**
	 * Main Visual Upload Handlers
	 */
	const handleImageSelect = (file: File) => {
		setSelectedFile(file);
		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		// Set temporary value to pass validation - replaced with real ID on submit
		setValue("main_visual_id", 1, { shouldValidate: true });
	};

	const handleImageRemove = () => {
		setSelectedFile(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
		setValue("main_visual_id", undefined, { shouldValidate: true });
	};

	/**
	 * Editor Image Upload Handler
	 * Stores file reference with temporary ID for later upload
	 */
	const handleEditorImageSelect = (tempId: string, file: File) => {
		setPendingImages((prev) => new Map(prev).set(tempId, file));
	};

	/**
	 * Sync pendingImages with current editor content
	 * Removes deleted images from upload queue
	 */
	useEffect(() => {
		// Recursively extract all temporary image IDs from content tree
		const extractTempIds = (node: JSONContent): string[] => {
			const ids: string[] = [];

			if (node.type === "image" && node.attrs?.tempId) {
				ids.push(node.attrs.tempId);
			}

			if (node.content) {
				for (const child of node.content) {
					ids.push(...extractTempIds(child));
				}
			}

			return ids;
		};

		const currentTempIds = extractTempIds(content);
		const currentTempIdSet = new Set(currentTempIds);

		// Clean up pendingImages - remove entries not in current content
		setPendingImages((prev) => {
			const updated = new Map(prev);
			let hasChanges = false;

			for (const tempId of prev.keys()) {
				if (!currentTempIdSet.has(tempId)) {
					updated.delete(tempId);
					hasChanges = true;
				}
			}

			return hasChanges ? updated : prev;
		});
	}, [content]);

	/**
	 * Recursively replace temporary image IDs with uploaded image IDs
	 * Walks content tree and updates image node attributes
	 */
	const replaceImageReferences = (
		content: JSONContent,
		imageIdMap: Map<string, number>,
	): JSONContent => {
		if (!content.content) return content;

		const newContent = content.content.map((node) => {
			// Replace tempId with real image_id for image nodes
			if (node.type === "image" && node.attrs?.tempId) {
				const imageId = imageIdMap.get(node.attrs.tempId);

				if (imageId) {
					return {
						...node,
						attrs: {
							...node.attrs,
							image_id: imageId,
						},
					};
				}
			}

			// Recursively process child nodes
			if (node.content) {
				return {
					...node,
					content: replaceImageReferences(
						{ content: node.content } as JSONContent,
						imageIdMap,
					).content,
				};
			}

			return node;
		});

		return {
			...content,
			content: newContent,
		};
	};

	/**
	 * Form Submission Handler
	 *
	 * Flow:
	 * 1. Upload main visual image (if selected)
	 * 2. Upload all editor images from pendingImages
	 * 3. Replace temporary IDs with uploaded image IDs
	 * 4. Submit note data to backend
	 */
	const onSubmit = async (data: CreateNoteFormData) => {
		try {
			// Step 1: Upload main visual image
			if (selectedFile) {
				const formData = new FormData();
				formData.append("files[]", selectedFile);

				const uploadResult = await uploadImageAction(formData);

				if (!uploadResult.success || !uploadResult.images) {
					throw new Error(uploadResult.error || "Failed to upload image");
				}

				data.main_visual_id = uploadResult.images[0].id;
			}

			// Step 2: Upload all editor images and map temp IDs to real IDs
			const imageIdMap = new Map<string, number>();

			for (const [tempId, file] of pendingImages.entries()) {
				const formData = new FormData();
				formData.append("files[]", file);

				const uploadResult = await uploadImageAction(formData);

				if (!uploadResult.success || !uploadResult.images) {
					throw new Error(
						uploadResult.error || "Failed to upload editor image",
					);
				}

				imageIdMap.set(tempId, uploadResult.images[0].id);
			}

			// Step 3: Replace temporary IDs with real image IDs in content
			const updatedContent = replaceImageReferences(data.content, imageIdMap);
			data.content = updatedContent;

			// Step 4: Submit note to backend
			const result = await createNoteAction(data);

			if (!result.success) {
				const error = result.error || "Failed to create note";
				toast.error(error);
				return;
			}

			if (result.note) {
				toast.success("Note created successfully");
				router.push(`/notes/${result.note.slug}`);
			}
		} catch (err) {
			const error =
				err instanceof Error ? err.message : "Failed to create note";
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

			{/* Lead/Summary Field */}
			<FormField name="lead" serverInvalid={!!errors.lead}>
				<FormLabel>Lead (Summary)</FormLabel>
				{errors.lead && <FormMessage>{errors.lead.message}</FormMessage>}
				<FormControl>
					<Textarea
						rows={3}
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
					{isSubmitting ? "Creating..." : "Create Note"}
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
