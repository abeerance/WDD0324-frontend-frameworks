import { Grid, GridItem } from "@/components/layout/grid/grid";
import { TiptapRenderer } from "@/components/tiptap/tiptap-renderer";
import { Tag } from "@/components/ui/tag/tag";
import { TextLink } from "@/components/ui/text-link/text-link";
import { Text } from "@/components/ui/text/text";
import { getNoteBySlug, getUserById } from "@/lib/api/notes/notes";
import { auth } from "@/lib/auth";
import type { JSONContent } from "@tiptap/react";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Page Props
 *
 * Next.js 15 async params pattern
 * params is a Promise that resolves to route parameters
 */
interface NoteDetailPageProps {
	params: Promise<{ slug: string }>;
}

/**
 * NoteDetailPage Component
 *
 * Server component that renders a note detail page
 *
 * Page structure:
 * 1. Note header (title + metadata: publish date, author)
 * 2. Main visual/hero image (golden ratio aspect)
 * 3. Color-coded tag pills
 * 4. Overview section (lead/summary)
 * 5. Full Tiptap content rendered to React components
 *
 * All content wrapped in Grid/GridItem for responsive layout:
 * - Mobile: Full width (12 columns)
 * - Desktop: Centered with varying widths (8-10 columns)
 *
 * Data flow:
 * 1. Extract slug from URL params
 * 2. Fetch note data from Laravel API
 * 3. Show 404 if note doesn't exist
 * 4. Fetch author/user data
 * 5. Parse Tiptap JSON content
 * 6. Render with custom components
 *
 * @param params - Route parameters containing note slug
 */
export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
	// Await params promise (Next.js 15 requirement)
	const { slug } = await params;

	// Get current session for ownership check
	const session = await auth();

	// Fetch note data using slug from URL
	// Slug format: YYYY-MM-DD-note-title
	const note = await getNoteBySlug(slug);

	// Show Next.js 404 page if note doesn't exist
	// This triggers the not-found.tsx file in the app directory
	if (!note) {
		notFound();
	}

	// Fetch note author data for metadata display
	// User might be null if deleted, so we handle that in the UI
	const user = await getUserById(note.user_id);

	// Check if current user is the note owner
	// Because Auth.js returns the ID as a string, we need to make a number conversion to ensure that we check the same type which is in the backend
	const isOwner = session?.user.id && Number(session.user.id) === note.user_id;

	// Parse Tiptap JSON content structure into typed object
	const content = JSON.parse(note.content) as JSONContent;

	return (
		<Grid className="-px-xs gap-l">
			{/* 
        Note Header Section
        Contains title and metadata (publish date, author)
        Narrower width (8/12) for better readability on desktop
      */}
			<GridItem span={{ sm: 12, md: 8 }} offset={{ sm: 0, md: 2 }}>
				{/* Note title as H1 for SEO */}
				<Text variant="headline-1" as="h1" className="font-bold mb-m">
					{note.title}
				</Text>

				{/* Metadata row: Publish date and Author displayed side by side */}
				<div className="flex justify-between">
					<div className="flex gap-xl text-foreground-600 mb-m">
						{/* Publish date: When the note was created */}
						<div>
							<Text
								variant="body-small"
								className="font-semibold text-foreground-500 uppercase"
							>
								Published
							</Text>
							<Text variant="body-small">
								{/* Format date as "March 15, 2025" */}
								{new Date(note.created_at).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</Text>
						</div>

						{/* Author: Note creator (only show if user data exists) */}
						{user && (
							<div>
								<Text
									variant="body-small"
									className="font-semibold text-foreground-500 uppercase"
								>
									Author
								</Text>
								<Text variant="body-small">
									{user.firstName} {user.lastName}
								</Text>
							</div>
						)}
					</div>
					{isOwner && (
						<Link href={`/notes/${note.slug}/edit`}>
							<TextLink className="bg-primary-700 text-white h-l w-l inline-flex items-center justify-center rounded-md">
								<Edit size={16} />
							</TextLink>
						</Link>
					)}
				</div>
			</GridItem>

			{/* 
        Main Visual Section
        Hero image with golden ratio aspect (1.618:1)
        Slightly wider than header (10/12 vs 8/12) for visual hierarchy
      */}
			<GridItem span={{ sm: 12, md: 10 }} offset={{ sm: 0, md: 1 }}>
				<div className="relative w-full aspect-[1.618/1] rounded-2xl overflow-hidden mb-xs">
					<Image
						src={note.main_visual.url}
						alt={note.main_visual.name}
						fill // Next.js Image fill mode for responsive container
						className="object-cover" // Crop to fill container while maintaining aspect
						priority // Load immediately (above the fold, critical for LCP)
					/>
				</div>
			</GridItem>

			{/* 
        Tags Section
        Color-coded category pills below main visual
        Only renders if note has tags
        Uses Tag component for consistent styling:
        - "thoughts" → primary (sage green)
        - "project" → secondary (dusty rose)
        - "play" → accent (mustard yellow)
      */}
			{note.tags.length > 0 && (
				<GridItem span={{ sm: 12, md: 10 }} offset={{ sm: 0, md: 1 }}>
					<div className="flex gap-s flex-wrap">
						{note.tags.map((tag) => (
							<Tag key={tag.id} name={tag.name} />
						))}
					</div>
				</GridItem>
			)}

			{/* 
        Overview Section
        Displays the note lead (short summary/description)
        Same width as main visual (10/12) for consistent reading width
      */}
			<GridItem span={{ sm: 12, md: 10 }} offset={{ sm: 0, md: 1 }}>
				{/* Section heading */}
				<Text variant="headline-4" as="h2" className="font-semibold mb-2xs">
					Overview
				</Text>
				{/* Lead text - note summary */}
				<Text className="text-foreground-700 mb-2xs">{note.lead}</Text>
			</GridItem>

			{/* 
        Full Content Section
        TiptapRenderer recursively converts Tiptap JSON to React components
        Handles all node types: headings, paragraphs, images, code blocks, etc.
      */}
			<TiptapRenderer content={content} />
		</Grid>
	);
}
