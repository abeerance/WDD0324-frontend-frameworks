import type { Note } from "@/lib/api/notes/notes";
import Image from "next/image";
import Link from "next/link";
import { Text } from "../ui/text/text";

interface NotesCardProps {
	note: Note;
}

export const NoteCard = ({ note }: NotesCardProps) => {
	return (
		<Link href={`/notes/${note.slug}`} className="group block">
			<article className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
				{/* 
                  Featured image container
                  Uses golden ratio (1.618:1) for aesthetically pleasing proportions
                */}
				<div className="relative w-full aspect-[1.618/1]">
					<Image
						src={note.main_visual.url}
						alt={note.main_visual.name}
						fill // Fills parent container
						className="object-cover" // Crops to fill without distortion
					/>
				</div>

				{/* Card text content */}
				<div className="p-s flex flex-col gap-xs">
					{/* 
                    Note title
                    Truncates to single line with ellipsis
                    Color changes on card hover via group-hover
                  */}
					<Text
						variant="headline-5"
						as="h3"
						className="font-semibold group-hover:text-primary-700 transition-colors duration-300 truncate"
					>
						{note.title}
					</Text>

					{/* 
                    Lead/excerpt text
                    line-clamp-3: Shows max 3 lines with ellipsis
                    min-h: Prevents layout shift when text is short by maintaining 3-line height
                  */}
					<Text
						variant="headline-5"
						className="mb-2xs line-clamp-3 min-h-[calc(var(--text-headline-5--line-height)*3)]"
					>
						{note.lead}
					</Text>

					{/* Tag pills - wraps to multiple rows if needed */}
					<div className="flex gap-2 flex-wrap mb-2xs">
						{note.tags.map((tag) => (
							<Text
								key={tag.id}
								as="span"
								className="px-xs py-3xs bg-primary-800 text-white rounded-md font-semibold"
							>
								{tag.name}
							</Text>
						))}
					</div>
				</div>
			</article>
		</Link>
	);
};
