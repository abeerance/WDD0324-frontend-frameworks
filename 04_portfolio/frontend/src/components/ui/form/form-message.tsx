import { cn } from "@/lib/utils";
import * as FormPrimitive from "@radix-ui/react-form";
import { ComponentPropsWithoutRef } from "react";

/**
 * Form Message component
 *
 * Wraps Radix UI's Form.Message primitive to display validation error messages.
 * Automatically shows/hides based on validation state matching.
 *
 * What Radix Form.Message provides automatically:
 * - Conditional rendering based on 'match' prop (valueMissing, typeMismatch, etc.)
 * - aria-live="polite" for screen reader announcements
 * - Automatic association with Form.Control via aria-describedby
 * - Shows only when validation fails for the specified match type
 * - Hides when field becomes valid
 *
 * Validation matchers (match prop):
 * - "valueMissing": Field is required but empty
 * - "typeMismatch": Wrong input type (e.g., invalid email format)
 * - "tooShort": Input shorter than minLength
 * - "tooLong": Input longer than maxLength
 * - "patternMismatch": Doesn't match pattern attribute
 * - Custom function: (value, formData) => boolean for custom validation
 *
 * Positioning strategy:
 * - absolute: Positioned relative to parent FormField (which has position: relative)
 * - left-0: Aligns with left edge of input
 * - top-[calc(93%+var(--spacing-2xs))]: Positions below input
 *   - 93%: Just below the input height
 *   - +var(--spacing-2xs): Adds small gap (design system spacing token)
 *   - calc() allows combining percentage with custom property
 *
 * Why absolute positioning?
 * - Prevents layout shift when error appears/disappears
 * - Keeps error message close to input without affecting other fields
 * - Maintains consistent spacing regardless of error state
 *
 * Typography:
 * - text-body-small: Small font size for subtle error messaging
 * - font-medium: Medium weight for readability without being bold
 * - font-cabinet-grotesk: Body font (Cabinet Grotesk) for consistency
 *
 * Color:
 * - text-secondary-600: Dusty rose (medium shade) for error indication
 * - Visible but not harsh, following design system error color
 *
 * Usage:
 * <FormMessage match="valueMissing">
 *   Please enter your email
 * </FormMessage>
 *
 * Multiple messages per field:
 * <FormMessage match="valueMissing">Email is required</FormMessage>
 * <FormMessage match="typeMismatch">Please enter a valid email</FormMessage>
 *
 * Custom validation:
 * <FormMessage match={(value) => value.length < 8}>
 *   Password must be at least 8 characters
 * </FormMessage>
 *
 * @param match - Validation matcher (required, determines when message shows)
 * @param className - Additional CSS classes to merge with base styles
 * @param props - All other props passed to Radix Form.Message
 */
export const FormMessage = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof FormPrimitive.Message>) => {
  return (
    <FormPrimitive.Message
      className={cn(
        // Position below input
        "absolute left-0 top-[calc(93%+var(--spacing-2xs))]",

        // Typography - small, readable
        "text-body-small font-medium font-cabinet-grotesk",

        // Color - secondary (dusty rose) for errors
        "text-secondary-600",

        // Custom classes
        className
      )}
      {...props}
    />
  );
};
