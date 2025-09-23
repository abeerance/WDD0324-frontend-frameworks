import { cn } from "@/lib/utils";
import { Component, type HTMLAttributes } from "react";

// Define union type for all HTML elements this component can render as
// Restricts to semantic text elements to maintain component purpose
type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span";

// Define available text style variants that map to CSS classes
// Each variant represents a different typography scale/purpose
export type TextVariant =
	| "headline-1" // Largest heading, typically for page titles
	| "headline-2" // Secondary headings, section titles
	| "headline-3" // Tertiary headings, subsection titles
	| "headline-4" // Quaternary headings, smaller sections
	| "headline-5" // Smallest heading variant
	| "body" // Standard body text, default reading size
	| "body-small"; // Smaller body text, captions, secondary info

// Extend HTMLAttributes to inherit all standard HTML props for flexibility
// HTMLAttributes<HTMLElement> provides props like onClick, onMouseOver, etc.
interface TextProps extends HTMLAttributes<HTMLElement> {
	// Optional prop to specify which HTML element to render
	// Defaults to "p" for semantic body text
	as?: TextElement;

	// Optional prop to specify typography variant
	// Defaults to "body" for standard text styling
	variant?: TextVariant;
}

export const Text = ({
	as = "p", // Default to paragraph element for semantic HTML
	variant = "body", // Default to body text styling
	className, // Allow custom CSS classes to be passed through
	children, // Content to be rendered inside the element
	...props // Spread remaining props to the rendered element
}: TextProps) => {
	// Map variant names to their corresponding CSS classes
	// These classes should be defined in your CSS/Tailwind configuration
	const variantClasses = {
		"headline-1": "text-headline-1",
		"headline-2": "text-headline-2",
		"headline-3": "text-headline-3",
		"headline-4": "text-headline-4",
		"headline-5": "text-headline-5",
		body: "text-body",
		"body-small": "text-body-small",
	};

	// Use the 'as' prop directly as the component to render
	// React accepts string element names like "h1", "p", etc.
	const ElementComponent = as;

	return (
		<ElementComponent
			{...props} // Spread all remaining props to the element
			className={cn(
				"text-neutral-20", // Base text color class
				variantClasses[variant], // Typography variant class
				className, // Custom classes passed via props
			)}
		>
			{children}
		</ElementComponent>
	);
};
