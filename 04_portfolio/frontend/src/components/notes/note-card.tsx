import type { Note } from "@/lib/api/notes/notes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "../ui/tag/tag";
import { Text } from "../ui/text/text";

interface NotesCardProps {
	note: Note;
}

/**
 * NoteCard Component
 *
 * Interactive note card with tag-based theming
 *
 * Hover effects adapt to primary tag:
 * - "thoughts" → sage green (primary-800 text, primary-300/50 shadow)
 * - "project" → dusty rose (secondary-800 text, secondary-300/50 shadow)
 * - "play" → mustard yellow (accent-800 text, accent-300/50 shadow)
 *
 * Layout:
 * - Golden ratio image (1.618:1)
 * - Title with truncation (single line + ellipsis)
 * - Lead text clamped to 3 lines with min-height to prevent layout shift
 * - Color-coded tag pills at bottom
 */
export const NoteCard = ({ note }: NotesCardProps) => {
	// Extract first tag to determine card theme colors
	const primaryTag = note.tags[0].name;

	return (
		<Link href={`/notes/${note.slug}`} className="group block">
			<article
				className={cn(
					"shadow-lg rounded-lg overflow-hidden transition duration-300",
					// Dynamic shadow color based on primary tag
					primaryTag === "thoughts" &&
						"hover:shadow-primary-300/50 hover:shadow-xl",
					primaryTag === "project" &&
						"hover:shadow-secondary-300/50 hover:shadow-xl",
					primaryTag === "play" && "hover:shadow-accent-300/50 hover:shadow-xl",
				)}
			>
				{/* Featured image with golden ratio proportions */}
				<div className="relative w-full aspect-[1.618/1]">
					<Image
						src={note.main_visual.url}
						alt={note.main_visual.name}
						fill
						className="object-cover"
					/>
				</div>

				{/* Card content */}
				<div className="p-s flex flex-col gap-xs">
					{/* 
            Note title
            Hover color matches primary tag theme
            Truncates to single line with ellipsis on overflow
          */}
					<Text
						variant="headline-5"
						as="h3"
						className={cn(
							"font-semibold transition-colors duration-300 truncate",
							primaryTag === "thoughts" && "group-hover:text-primary-800",
							primaryTag === "project" && "group-hover:text-secondary-800",
							primaryTag === "play" && "group-hover:text-accent-800",
						)}
					>
						{note.title}
					</Text>

					{/* 
            Lead/excerpt text
            line-clamp-3: Shows max 3 lines with ellipsis
            min-h: Maintains 3-line height even with short text to prevent layout shift
          */}
					<Text
						variant="headline-5"
						className="mb-2xs line-clamp-3 min-h-[calc(var(--text-headline-5--line-height)*3)]"
					>
						{note.lead}
					</Text>

					{/* Tag pills with color coding */}
					<div className="flex gap-2 flex-wrap mb-2xs">
						{note.tags.map((tag) => (
							<Tag key={tag.id} name={tag.name} />
						))}
					</div>
				</div>
			</article>
		</Link>
	);
};
