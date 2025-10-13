import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom Tailwind Merge configuration
 *
 * Extends the default tailwind-merge behavior to handle custom design tokens
 * and class names that aren't part of standard Tailwind CSS.
 * This prevents class conflicts when merging custom classes with standard ones.
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    /**
     * Custom theme extensions
     * Defines additional design tokens beyond Tailwind's defaults
     */
    theme: {
      /**
       * Custom typography scale classes
       * Maps to your design system's text hierarchy
       * Used in Text component variants for consistent typography
       */
      text: [
        "headline-1", // Largest heading size
        "headline-2", // Secondary heading size
        "headline-3", // Tertiary heading size
        "headline-4", // Quaternary heading size
        "headline-5", // Smallest heading size
        "body", // Standard body text size
        "body-small", // Small body text size
      ],

      /**
       * Custom spacing scale
       * Provides consistent spacing values across components
       * Used for padding, margins, gaps, etc. throughout the design system
       */
      spacing: ["3xs", "2xs", "xs", "s", "m", "l", "xl"],
    },

    /**
     * Custom class groups for conflict resolution
     * Tells tailwind-merge which classes should override each other
     * Prevents multiple conflicting classes from being applied simultaneously
     */
    classGroups: {
      /**
       * Font size class group
       * Ensures only one typography variant is applied at a time
       * When multiple text classes are provided, the last one takes precedence
       */
      "font-size": [
        "headline-1",
        "headline-2",
        "headline-3",
        "headline-4",
        "headline-5",
        "body",
        "body-small",
      ],

      /**
       * Gap class group for flexbox/grid spacing
       * Handles custom spacing values in gap utilities
       * Ensures consistent spacing behavior with custom tokens
       */
      gap: [{ gap: ["3xs", "2xs", "xs", "s", "m", "l", "xl"] }],
    },
  },
});

/**
 * Utility function for conditional and merged class names
 *
 * Combines the power of clsx (conditional classes) with tailwind-merge (conflict resolution):
 *
 * 1. clsx: Handles conditional logic, arrays, objects for building class strings
 *    - Filters out falsy values
 *    - Flattens arrays and objects
 *    - Joins everything into a single string
 *
 * 2. customTwMerge: Intelligently merges Tailwind classes
 *    - Removes duplicate/conflicting classes
 *    - Respects class precedence rules
 *    - Handles custom design tokens
 *
 * @param inputs - Any number of class values (strings, objects, arrays, conditionals)
 * @returns Merged and deduplicated class string
 *
 * @example
 * cn("text-red-500", "text-blue-500") // → "text-blue-500" (last wins)
 * cn("p-4", { "p-8": isLarge }) // → "p-4" or "p-8" based on condition
 * cn(["flex", "items-center"], undefined, "gap-s") // → "flex items-center gap-s"
 */

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
