import TiptapImage from "@tiptap/extension-image";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { renderToReactElement } from "@tiptap/static-renderer";
import Image from "next/image";
import type { JSX } from "react";
import { GridItem } from "../layout/grid/grid";
import { Text } from "../ui/text/text";

/**
 * WHAT IS TIPTAP?
 *
 * Tiptap is a headless rich text editor framework built on ProseMirror.
 * It allows you to create rich text editors (like Medium, Notion, Google Docs)
 * with complete control over the UI and behavior.
 *
 * Key concepts:
 * - Stores content as JSON (not HTML), making it database-friendly and portable
 * - Headless: You control the UI, Tiptap handles the editing logic
 * - Extensible: Add custom nodes (like custom blocks) and marks (like custom formatting)
 * - Based on ProseMirror's document model (nodes form a tree structure)
 *
 * In this component:
 * - We receive Tiptap's JSON output from the backend
 * - We parse it and render it as React components
 * - We apply custom styling and layout logic
 * - We handle special cases like image + description pairs
 */

interface TiptapRendererProps {
	content: JSONContent; // Tiptap's JSON structure representing the document
}

/**
 * TiptapRenderer Component
 *
 * Renders Tiptap JSON content with custom image + description layout.
 *
 * Flow:
 * 1. Receive JSON content from Tiptap editor (stored in database)
 * 2. Loop through all nodes (paragraphs, headings, images, etc.)
 * 3. Detect special pattern: image followed by paragraph
 * 4. Render image+description pairs with alternating left/right layout
 * 5. Render all other content normally using Tiptap's static renderer
 *
 * Each element is wrapped in GridItem for consistent layout.
 */
export function TiptapRenderer({ content }: TiptapRendererProps) {
	// Store all processed elements that will be rendered
	const processedElements: JSX.Element[] = [];

	// Track number of images to alternate description position (left/right)
	let imageCounter = 0;

	// content.content contains the array of top-level nodes (paragraphs, headings, images, etc.)
	if (content.content) {
		for (let i = 0; i < content.content.length; i++) {
			const node = content.content[i]; // Current node
			const nextNode = content.content[i + 1]; // Peek at next node

			/**
			 * SPECIAL CASE: Image + Description Pattern
			 *
			 * Detect when an image is immediately followed by a paragraph.
			 * We treat this as an "image with description" pattern and render them together
			 * in a custom two-column layout.
			 *
			 * Pattern:
			 * {
			 *   type: "image",
			 *   attrs: { src: "...", alt: "..." }
			 * },
			 * {
			 *   type: "paragraph",
			 *   content: [{ type: "text", text: "Description text..." }]
			 * }
			 */
			if (node.type === "image" && nextNode?.type === "paragraph") {
				// Alternate description position: even = left, odd = right
				const isDescriptionLeft = imageCounter % 2 === 0;

				// Extract image data from Tiptap node
				const src = node.attrs?.src as string;
				const alt = (node.attrs?.alt as string) || "";

				// Extract description text from paragraph node
				// Paragraph contains content array of text nodes
				const description =
					nextNode.content?.map((c) => c.text || "").join("") || "";

				// Render custom image + description layout
				processedElements.push(
					<GridItem
						key={`image-desc-${i}`}
						span={{ sm: 12, md: 8 }} // Full width mobile, 8/12 on desktop
						offset={{ sm: 0, md: 2 }} // Centered on desktop with 2 column offset
						className="my-l"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
							{/* Description text */}
							<div className={isDescriptionLeft ? "md:order-1" : "md:order-2"}>
								<Text
									variant="headline-5"
									className="leading-relaxed font-semibold"
								>
									{description}
								</Text>
							</div>

							{/* Image */}
							<div
								className={`relative w-full aspect-[1.618/1] rounded-lg overflow-hidden ${isDescriptionLeft ? "md:order-2" : "md:order-1"}`}
							>
								<Image src={src} alt={alt} fill className="object-cover" />
							</div>
						</div>
					</GridItem>,
				);

				imageCounter++; // Increment for next image
				i++; // Skip next node since we've already processed the paragraph
				continue; // Move to next iteration
			}

			/**
			 * DEFAULT CASE: Render all other nodes normally
			 *
			 * Use Tiptap's static renderer to convert JSON nodes to React elements.
			 * We provide custom mappings for how each node type should be styled.
			 *
			 * Available node types from StarterKit:
			 * - heading (h1-h6)
			 * - paragraph
			 * - bulletList / orderedList / listItem
			 * - blockquote
			 * - codeBlock
			 * - image (standalone, not part of image+description pattern)
			 */
			processedElements.push(
				<GridItem
					key={`node-${i}`}
					span={{ sm: 12, md: 10 }} // Full width mobile, 10/12 on desktop
					offset={{ sm: 0, md: 1 }} // Centered on desktop with 1 column offset
				>
					{renderToReactElement({
						// Wrap single node in document structure (Tiptap requires top-level "doc")
						content: { type: "doc", content: [node] },

						// Extensions define what node types are recognized
						extensions: [
							StarterKit, // Basic nodes: heading, paragraph, lists, etc.
							TiptapImage, // Image node support
						],

						options: {
							/**
							 * nodeMapping: Define how each node type renders as React
							 *
							 * Each function receives:
							 * - node: The Tiptap node with type, attrs, content
							 * - children: Pre-rendered children (for container nodes)
							 */
							nodeMapping: {
								// Headings (h1-h6) with custom styling per level
								heading: ({ node, children }) => {
									const level = node.attrs?.level || 2;
									const classes: Record<number, string> = {
										1: "text-headline-2 font-bold",
										2: "text-headline-3 font-bold",
										3: "text-headline-4 font-bold",
										4: "text-headline-5 font-semibold",
									};
									return (
										<span className={classes[level] || classes[4]}>
											{children}
										</span>
									);
								},

								// Paragraphs using custom Text component
								paragraph: ({ children }) => <Text>{children}</Text>,

								// Unordered lists (bullets)
								bulletList: ({ children }) => (
									<ul className="text-body list-disc pl-l">{children}</ul>
								),

								// Ordered lists (numbers)
								orderedList: ({ children }) => (
									<ol className="text-body list-decimal pl-l">{children}</ol>
								),

								// List items (used by both bullet and ordered lists)
								listItem: ({ children }) => <li>{children}</li>,

								// Blockquotes (styled with left border)
								blockquote: ({ children }) => (
									<blockquote className="border-l-4 my-m border-primary-500 pl-m italic text-foreground-600">
										{children}
									</blockquote>
								),

								// Code blocks (multi-line code with syntax highlighting placeholder)
								codeBlock: ({ node }) => (
									<pre className="bg-background-100 rounded-lg p-m my-m overflow-x-auto">
										<code className="text-body-small font-mono">
											{node.textContent}
										</code>
									</pre>
								),

								// Standalone images (not part of image+description pattern)
								image: ({ node }) => {
									const src = node.attrs?.src as string;
									const alt = (node.attrs?.alt as string) || "";
									return (
										<div className="relative w-full aspect-video rounded-lg overflow-hidden">
											<Image
												src={src}
												alt={alt}
												fill
												className="object-cover"
											/>
										</div>
									);
								},
							},

							/**
							 * markMapping: Define how text marks (inline formatting) render
							 *
							 * Marks are formatting that applies to ranges of text:
							 * - bold: **text**
							 * - italic: *text*
							 * - code: `text`
							 *
							 * Multiple marks can apply to the same text (e.g., bold + italic)
							 */
							markMapping: {
								// Bold text
								bold: ({ children }) => (
									<strong className="font-bold">{children}</strong>
								),

								// Italic text
								italic: ({ children }) => (
									<em className="italic">{children}</em>
								),

								// Inline code (single word/phrase)
								code: ({ children }) => (
									<code className="bg-background-100 px-2xs py-3xs rounded text-body-small font-mono">
										{children}
									</code>
								),
							},
						},
					})}
				</GridItem>,
			);
		}
	}

	// Render all processed elements as React fragment
	return <>{processedElements}</>;
}
