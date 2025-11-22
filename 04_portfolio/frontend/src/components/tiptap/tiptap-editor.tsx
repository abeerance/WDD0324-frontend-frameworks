"use client";

import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { TiptapSkeleton } from "./tiptap-skeleton";
import { TiptapToolbar } from "./tiptap-toolbar";

interface TiptapEditorProps {
	content: JSONContent;
	onChange: (content: JSONContent) => void;
	editable?: boolean;
	placeholder?: string;
	onImageSelect?: (tempId: string, file: File) => void;
}

/**
 * Rich text editor using Tiptap with image upload support
 *
 * Outputs JSONContent structure compatible with backend storage
 */
export function TiptapEditor({
	content,
	onChange,
	editable = true,
	placeholder = "Start writing...",
	onImageSelect,
}: TiptapEditorProps) {
	/**
	 * Extended Image node with custom attributes for tracking uploads
	 * - tempId: temporary identifier for optimistic UI updates during upload
	 * - image_id: final backend image ID after successful upload
	 */
	const CustomImage = TiptapImage.extend({
		addAttributes() {
			return {
				...this.parent?.(),
				tempId: {
					default: null,
				},
				image_id: {
					default: null,
				},
			};
		},
	});

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3, 4],
				},
			}),
			CustomImage.configure({
				inline: false, // Block-level prevents hydration errors from nesting in paragraphs
				HTMLAttributes: {
					class: "max-w-full h-auto",
				},
			}),
			Placeholder.configure({
				placeholder,
				emptyEditorClass: "is-editor-empty",
			}),
		],
		content,
		editable,
		editorProps: {
			attributes: {
				class:
					"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] px-m py-s",
			},
		},
		onUpdate: ({ editor }) => {
			const json = editor.getJSON();
			onChange(json);
		},
		onCreate: ({ editor }) => {
			console.log(
				"EDITOR ON CREATE:",
				JSON.stringify(editor.getJSON(), null, 2),
			);
		},
	});

	/**
	 * Handle image file selection and insert preview
	 * Creates temporary ID for tracking upload progress
	 */
	const handleImageUpload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";

		input.onchange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			const file = target.files?.[0];
			if (!file) return;

			// Create blob URL for immediate preview while upload happens
			const previewUrl = URL.createObjectURL(file);
			const tempId = `temp-${Date.now()}`;

			onImageSelect?.(tempId, file);

			editor?.commands.insertContent({
				type: "image",
				attrs: {
					src: previewUrl,
					alt: file.name,
					tempId: tempId,
				},
			});
		};

		input.click();
	};

	if (!editor) {
		return <TiptapSkeleton />;
	}

	return (
		<div className="border border-foreground-200 rounded-lg overflow-hidden">
			<TiptapToolbar editor={editor} onImageUpload={handleImageUpload} />
			<EditorContent editor={editor} />
		</div>
	);
}
