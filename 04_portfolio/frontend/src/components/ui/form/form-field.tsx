import { cn } from "@/lib/utils";
import * as FormPrimitive from "@radix-ui/react-form";
import { ComponentPropsWithoutRef } from "react";

/**
 * Form Field wrapper component
 *
 * Wraps Radix UI's Form.Field primitive to create a complete field context.
 * This is the foundation that connects Label, Control, and Message components.
 *
 * What Form.Field does automatically:
 * - Creates a unique ID based on the 'name' prop
 * - Connects Form.Label to Form.Control via htmlFor/id
 * - Provides validation state to all children (data-invalid, data-valid attributes)
 * - Manages error message visibility based on validation state
 * - Handles aria-describedby for accessibility
 *
 * The 'name' prop is REQUIRED and serves as:
 * - The form field identifier for submission
 * - The base for generating unique IDs
 * - The key for validation state management
 *
 * Layout structure:
 * - space-y-2xs: Vertical spacing between label, input, and error message
 * - relative: Required for absolutely positioned error messages (FormMessage)
 *
 * Data attributes added by Radix:
 * - [data-invalid]: Present when field validation fails
 * - [data-valid]: Present when field validation passes
 *
 * These attributes cascade to child components (Label, Control, Message)
 * allowing them to style themselves based on validation state.
 *
 * Usage:
 * <FormField name="email">
 *   <FormLabel>Email</FormLabel>
 *   <FormControl>
 *     <Input type="email" required />
 *   </FormControl>
 *   <FormMessage match="valueMissing">Please enter your email</FormMessage>
 * </FormField>
 *
 * @param name - REQUIRED. The field name for form submission and ID generation
 * @param className - Additional CSS classes to merge with default spacing
 * @param props - All other props passed to Radix Form.Field (serverInvalid, etc.)
 */
export const FormField = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof FormPrimitive.Field>) => {
  return <FormPrimitive.Field className={cn("space-y-2xs relative", className)} {...props} />;
};
