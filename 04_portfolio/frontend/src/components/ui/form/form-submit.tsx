import { cn } from "@/lib/utils";
import * as FormPrimitive from "@radix-ui/react-form";
import { ComponentPropsWithoutRef } from "react";
import { Button } from "../button/button";

/**
 * Form Submit component
 *
 * Wraps Radix UI's Form.Submit primitive to create a form submission button.
 * Automatically triggers form validation before submission.
 *
 * What Radix Form.Submit provides automatically:
 * - type="submit" attribute on the button
 * - Triggers validation on all Form.Field components before submission
 * - Prevents submission if any field has validation errors
 * - Shows Form.Message components for invalid fields
 * - Calls Form.Root's onSubmit handler only after validation passes
 * - Handles Enter key press for form submission
 * - Manages disabled state during submission (if configured)
 *
 * Validation flow:
 * 1. User clicks submit button
 * 2. Radix validates all fields using browser Constraint Validation API
 * 3. If any field is invalid:
 *    - Shows matching Form.Message components
 *    - Adds data-invalid attribute to Form.Field
 *    - Adds aria-invalid="true" to Form.Control
 *    - Focuses first invalid field
 *    - Does NOT call onSubmit
 * 4. If all fields are valid:
 *    - Calls Form.Root's onSubmit handler
 *    - Passes form submission event
 *
 * The asChild prop:
 * - Tells Radix to merge its props with the child component
 * - Your Button gets type="submit" and all form functionality
 * - Maintains your Button's styling and variants
 * - All Radix form functionality is added to YOUR Button
 *
 * Usage:
 * <FormSubmit buttonVariant="primary">
 *   Submit
 * </FormSubmit>
 *
 * With custom styling:
 * <FormSubmit buttonVariant="primary" buttonClassName="w-full">
 *   Send Message
 * </FormSubmit>
 *
 * @param children - Button text/content to display
 * @param buttonVariant - Button style variant (primary, secondary, accent, ghost, outline)
 * @param buttonClassName - Additional CSS classes for the Button component
 * @param className - Not used in this implementation (buttonClassName used instead)
 * @param props - All other props passed to Radix Form.Submit
 */

/**
 * Extended props interface for FormSubmit
 *
 * Extends Radix Form.Submit props with custom button configuration:
 * - buttonVariant: Controls button appearance using design system variants
 * - buttonClassName: Passes custom CSS classes directly to Button component
 *
 * This approach eliminates the need for asChild at the usage level
 * by baking the Button component directly into FormSubmit
 */
interface FormSubmitProps extends ComponentPropsWithoutRef<typeof FormPrimitive.Submit> {
  /**
   * Button visual variant from design system
   *
   * - "primary": Sage green background, main call-to-action
   * - "secondary": Dusty rose background, secondary actions
   * - "accent": Mustard yellow background, attention-grabbing
   * - "ghost": No background, minimal text-only style
   * - "outline": Border style with transparent background
   *
   * Default: undefined (Button component's default is "primary")
   */
  buttonVariant?: "primary" | "secondary" | "accent" | "ghost" | "outline";

  /**
   * Additional CSS classes applied to the Button component
   *
   * Merged with Button's base styles using cn() utility
   * Useful for layout adjustments like width, margins, etc.
   *
   * Example: buttonClassName="w-full mt-4"
   */
  buttonClassName?: string;
}

/**
 * FormSubmit component implementation
 *
 * This version directly renders a Button component instead of accepting
 * children, making the API simpler but less flexible.
 *
 * Pros of this approach:
 * - Simpler API: No need for asChild pattern at usage level
 * - Consistent button styling across all forms
 * - Less nesting in JSX
 * - ButtonVariant prop is more explicit than variant prop collision
 *
 * Cons of this approach:
 * - Less flexible: Can't pass custom button components
 * - Children must be text/simple content
 * - Can't use Button component features like icons easily
 *
 * The asChild prop here:
 * - Connects Radix Form.Submit functionality to our Button
 * - Button receives type="submit" and form submission logic
 * - Button's existing props (variant, className) work as expected
 */
export const FormSubmit = ({
  buttonVariant,
  buttonClassName,
  className, // Not used but accepted for API compatibility
  children,
  ...props
}: FormSubmitProps) => {
  return (
    <FormPrimitive.Submit {...props}>
      <Button type="submit" variant={buttonVariant} className={buttonClassName}>
        {children}
      </Button>
    </FormPrimitive.Submit>
  );
};
