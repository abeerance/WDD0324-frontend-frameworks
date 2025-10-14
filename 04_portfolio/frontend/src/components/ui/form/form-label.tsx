import { cn } from "@/lib/utils";
import * as FormPrimitive from "@radix-ui/react-form";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";

/**
 * Form Label component
 *
 * Wraps Radix UI's Form.Label primitive with styled design system tokens.
 * Automatically connects to Form.Control via htmlFor/id attributes.
 *
 * What Radix Form.Label provides automatically:
 * - htmlFor attribute matching the associated Form.Control's id
 * - data-invalid attribute when field validation fails
 * - data-valid attribute when field validation passes
 * - Proper accessibility for screen readers
 * - Click handling to focus the associated input
 *
 * Styling behavior based on validation state:
 * - Default: text-foreground-900 (very dark gray, high contrast)
 * - Invalid: text-secondary-600 (dusty rose, signals error)
 * - Valid: text-primary-600 (sage green, signals success)
 *
 * Typography:
 * - text-body: Uses body text size from design system
 * - font-semibold: Medium weight for emphasis as a label
 * - font-general-sans: Uses heading font (General Sans) for labels
 *
 * ForwardRef usage:
 * - Allows parent components to access the underlying DOM element
 * - Useful for focus management, scroll positioning, or animations
 * - Maintains compatibility with Radix's ref forwarding
 *
 * Data attributes from parent Form.Field:
 * - [data-invalid]: Applied when field has validation errors
 * - [data-valid]: Applied when field passes validation
 *
 * These attributes use CSS attribute selectors for styling:
 * - data-[invalid]:text-secondary-600 → applies when data-invalid present
 * - data-[valid]:text-primary-600 → applies when data-valid present
 *
 * Usage:
 * <FormLabel>Email Address</FormLabel>
 *
 * Or with custom styling:
 * <FormLabel className="text-lg">Email Address</FormLabel>
 *
 * @param className - Additional CSS classes to merge with base styles
 * @param ref - Forwarded ref to access the label DOM element
 * @param props - All other props passed to Radix Form.Label
 */

export const FormLabel = forwardRef<
  ComponentRef<typeof FormPrimitive.Label>,
  ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <FormPrimitive.Label
      ref={ref}
      className={cn(
        // Base styles
        "text-body font-semibold font-general-sans",

        // Default color
        "text-foreground-900",

        // Invalid state - changes to secondary (dusty rose)
        "data-[invalid]:text-secondary-600",

        // Valid state - changes to primary (sage green)
        "data-[valid]:text-primary-600",

        // Custom classes
        className
      )}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";
