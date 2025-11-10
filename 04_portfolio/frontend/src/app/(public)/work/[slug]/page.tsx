import { Grid, GridItem } from "@/components/layout/grid/grid";
import { Text } from "@/components/ui/text/text";
import { getProjectBySlug, getUserById } from "@/lib/api/work/work";
import Image from "next/image";
import { notFound } from "next/navigation";

/**
 * Page Props
 *
 * Next.js 15 async params pattern.
 * params is a Promise that resolves to route parameters.
 */
interface WorkDetailPageProps {
	params: Promise<{ slug: string }>;
}

/**
 * WorkDetailPage Component
 *
 * Server component that renders a project detail page.
 *
 * Page structure:
 * 1. Project header (title + metadata: timeline, team)
 * 2. Main visual/hero image (golden ratio aspect)
 * 3. Overview section (lead/summary)
 *
 * All content wrapped in Grid/GridItem for responsive layout:
 * - Mobile: Full width (12 columns)
 * - Desktop: Centered with varying widths (8-10 columns)
 *
 * Data flow:
 * 1. Extract slug from URL params
 * 2. Fetch project data from Laravel API
 * 3. Show 404 if project doesn't exist
 * 4. Fetch author/user data
 * 5. Render with custom components
 *
 * @param params - Route parameters containing project slug
 */
export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
	// Await params promise (Next.js 15 requirement)
	const { slug } = await params;

	// Fetch project data using slug from URL
	// Slug format: YYYY-MM-DD-project-title
	const project = await getProjectBySlug(slug);

	// Show Next.js 404 page if project doesn't exist
	// This triggers the not-found.tsx file in the app directory
	if (!project) {
		notFound();
	}

	// Fetch project author data for metadata display
	// User might be null if deleted, so we handle that in the UI
	const user = await getUserById(project.user_id);

	return (
		<Grid className="-px-xs gap-l">
			{/* 
				Project Header Section
				Contains title and metadata (timeline, team)
				Narrower width (8/12) for better readability on desktop
			*/}
			<GridItem span={{ sm: 12, md: 8 }} offset={{ sm: 0, md: 2 }}>
				{/* Project title as H1 for SEO */}
				<Text variant="headline-1" as="h1" className="font-bold mb-m">
					{project.title}
				</Text>

				{/* Metadata row: Timeline and Team displayed side by side */}
				<div className="flex gap-xl text-foreground-600 mb-m">
					{/* Timeline: When the project was created */}
					<div>
						<Text
							variant="body-small"
							className="font-semibold text-foreground-500 uppercase"
						>
							Timeline
						</Text>
						<Text variant="body-small">
							{/* Format date as "March 2025" */}
							{new Date(project.created_at).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
							})}
						</Text>
					</div>

					{/* Team: Project author/creator (only show if user data exists) */}
					{user && (
						<div>
							<Text
								variant="body-small"
								className="font-semibold text-foreground-500 uppercase"
							>
								Team
							</Text>
							<Text variant="body-small">
								{user.firstName} {user.lastName}
							</Text>
						</div>
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
						src={project.main_visual.url}
						alt={project.main_visual.name}
						fill // Next.js Image fill mode for responsive container
						className="object-cover" // Crop to fill container while maintaining aspect
						priority // Load immediately (above the fold, critical for LCP)
					/>
				</div>
			</GridItem>

			{/* 
				Overview Section
				Displays the project lead (short summary/description)
				Same width as main visual (10/12) for consistent reading width
			*/}
			<GridItem span={{ sm: 12, md: 10 }} offset={{ sm: 0, md: 1 }}>
				{/* Section heading */}
				<Text variant="headline-4" as="h2" className="font-semibold mb-2xs">
					Overview
				</Text>
				{/* Lead text - project summary */}
				<Text className="text-foreground-700 mb-2xs">{project.lead}</Text>
			</GridItem>
		</Grid>
	);
}
