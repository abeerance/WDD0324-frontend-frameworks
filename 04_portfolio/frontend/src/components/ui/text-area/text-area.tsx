import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Reusable Textarea component matching Input styling
 *
 * Same color system as Input but with:
 * - min-height for better UX
 * - resize-vertical to prevent horizontal stretching
 * - Larger padding for multiline content
 */
function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        // Base styles
        "w-full min-w-0 rounded-md border px-s py-2xs transition-all duration-300 ease-[--ease-out-quart] outline-none",

        // Textarea specific
        "min-h-[120px] resize-vertical",

        // Typography
        "text-body font-cabinet-grotesk",

        // Colors - same as Input
        "bg-background-50 border-background-300 text-foreground-900",
        "placeholder:text-foreground-50",

        // Focus state
        "focus-visible:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-500/20",

        // Invalid state
        "aria-invalid:border-secondary-500 aria-invalid:ring-4 aria-invalid:ring-secondary-500/20",

        // Valid state
        "aria-[invalid=false]:border-primary-500",

        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",

        // Selection styling
        "selection:bg-primary-200 selection:text-primary-900",

        // Shadow
        "shadow-sm",

        // Custom classes
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
