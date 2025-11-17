/**
 * TiptapSkeleton Component
 *
 * A loading skeleton displayed while the Tiptap editor initializes.
 * Mimics the visual structure of the editor with animated placeholder elements.
 *
 * Structure:
 * - Toolbar skeleton: Shows placeholder buttons with pulsing animation
 * - Editor skeleton: Shows placeholder text lines representing content
 *
 * This prevents layout shift and provides visual feedback during the editor's
 * initialization phase, especially important with Next.js when using
 * immediatelyRender: false to avoid hydration issues.
 */
export const TiptapSkeleton = () => {
	return (
		<div className="border border-foreground-200 rounded-lg overflow-hidden">
			{/* Toolbar skeleton - represents formatting buttons */}
			<div className="border-b border-foreground-200 bg-background-50 p-xs flex flex-wrap gap-xs">
				<div className="w-12 h-8 bg-background-200 rounded animate-pulse" />
				<div className="w-12 h-8 bg-background-200 rounded animate-pulse" />
				<div className="w-12 h-8 bg-background-200 rounded animate-pulse" />
				<div className="w-px bg-foreground-200" />
				<div className="w-8 h-8 bg-background-200 rounded animate-pulse" />
				<div className="w-8 h-8 bg-background-200 rounded animate-pulse" />
				<div className="w-12 h-8 bg-background-200 rounded animate-pulse" />
			</div>
			{/* Editor skeleton - represents text content area */}
			<div className="min-h-[400px] px-m py-s">
				<div className="space-y-s">
					<div className="h-4 bg-background-200 rounded animate-pulse w-3/4" />
					<div className="h-4 bg-background-200 rounded animate-pulse w-full" />
					<div className="h-4 bg-background-200 rounded animate-pulse w-5/6" />
				</div>
			</div>
		</div>
	);
};
