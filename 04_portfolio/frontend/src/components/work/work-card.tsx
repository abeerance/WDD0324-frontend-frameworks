import type { Project } from "@/lib/api/work/work";
import Image from "next/image";
import Link from "next/link";
import { Text } from "../ui/text/text";

interface WorkCardProps {
	project: Project;
}

/**
 * WorkCard Component
 *
 * Interactive project card with hover effects:
 * - Expanding gradient overlay on hover
 * - Animated text reveal (title slides up, lead fades in)
 * - Enhanced shadow for depth
 *
 * Layout:
 * - Full-bleed background image
 * - Text overlaid on top-right with gradient protection
 * - Responsive height: 400px mobile, 500px tablet+
 */
export function WorkCard({ project }: WorkCardProps) {
	return (
		<Link
			href={`/work/${project.slug}`}
			prefetch={true}
			className="group relative block overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl w-full h-[400px] md:h-[500px]"
		>
			{/* Base gradient - fades out on hover */}
			<div className="absolute inset-x-0 top-0 z-5 h-1/3 group-hover:h-full bg-linear-to-b from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-all duration-300" />

			{/* Primary gradient - fades in on hover */}
			<div className="absolute inset-x-0 top-0 z-5 h-1/3 group-hover:h-full bg-linear-to-b from-primary-800 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

			{/* Text content container - positioned top-right with right alignment */}
			<div className="absolute z-10 p-6 mb-4 right-0 flex flex-col items-end space-y-m transition-transform duration-300">
				{/* Project title - always visible, moves up on hover */}
				<Text
					variant="headline-3"
					as="h2"
					className="font-bold text-white max-w-92 text-right"
				>
					{project.title}
				</Text>

				{/* Project lead - hidden by default, fades in on hover */}
				<Text
					variant="headline-5"
					as="span"
					className="text-white max-w-92 text-right uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium"
				>
					{project.lead}
				</Text>
			</div>

			{/* Background image - covers entire card */}
			<Image
				src={project.main_visual.url}
				alt={project.main_visual.name}
				fill
				className="object-cover"
			/>
		</Link>
	);
}
