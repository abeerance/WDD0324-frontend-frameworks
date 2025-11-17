import type { Editor } from "@tiptap/react";
import { TiptapToolbarButton } from "./tiptap-toolbar-button";

interface TiptapToolbarProps {
	editor: Editor;
	onImageUpload?: () => void;
}

export function TiptapToolbar({ editor, onImageUpload }: TiptapToolbarProps) {
	return (
		<div className="border-b border-foreground-200 bg-background-50 p-xs flex flex-wrap gap-xs">
			{/* Headings */}
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				isActive={editor.isActive("heading", { level: 1 })}
				icon="Heading1"
				label="Heading 1"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				isActive={editor.isActive("heading", { level: 2 })}
				icon="Heading2"
				label="Heading 2"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				isActive={editor.isActive("heading", { level: 3 })}
				icon="Heading3"
				label="Heading 3"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				isActive={editor.isActive("heading", { level: 4 })}
				icon="Heading4"
				label="Heading 4"
			/>

			<div className="w-px bg-foreground-200" />

			{/* Text formatting */}
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				isActive={editor.isActive("bold")}
				icon="Bold"
				label="Bold"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				isActive={editor.isActive("italic")}
				icon="Italic"
				label="Italic"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleCode().run()}
				isActive={editor.isActive("code")}
				icon="Code"
				label="Code"
			/>

			<div className="w-px bg-foreground-200" />

			{/* Lists */}
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				isActive={editor.isActive("bulletList")}
				icon="List"
				label="Bullet List"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				isActive={editor.isActive("orderedList")}
				icon="ListOrdered"
				label="Ordered List"
			/>

			<div className="w-px bg-foreground-200" />

			{/* Blocks */}
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				isActive={editor.isActive("codeBlock")}
				icon="SquareCode"
				label="Code Block"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				isActive={editor.isActive("blockquote")}
				icon="Quote"
				label="Quote"
			/>

			<div className="w-px bg-foreground-200" />

			{/* Image */}
			{onImageUpload && (
				<TiptapToolbarButton
					onClick={onImageUpload}
					icon="ImagePlus"
					label="Upload Image"
				/>
			)}

			<div className="w-px bg-foreground-200" />

			{/* Undo/Redo */}
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().undo()}
				icon="Undo2"
				label="Undo"
			/>
			<TiptapToolbarButton
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().redo()}
				icon="Redo2"
				label="Redo"
			/>
		</div>
	);
}
