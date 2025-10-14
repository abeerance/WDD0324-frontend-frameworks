import { cn } from "@/lib/utils";
import * as FormPrimitive from "@radix-ui/react-form";
import { ComponentPropsWithoutRef } from "react";

/**
 * Form Root component
 *
 * Wraps Radix UI's Form.Root primitive to create the main form container.
 * This is the top-level component that manages the entire form context.
 *
 * What Radix Form.Root provides automatically:
 * - Native HTML <form> element with enhanced validation
 * - Built-in form submission handling via onSubmit prop
 * - Automatic validation before submission (client-side)
 * - Server-side error management via onClearServerErrors callback
 * - Context provider for all child Form components
 * - Prevents default form submission to allow custom handling
 *
 * Form submission flow:
 * 1. User clicks submit button (Form.Submit)
 * 2. Radix validates all Form.Field components
 * 3. If validation fails, shows error messages (Form.Message)
 * 4. If validation passes, calls onSubmit handler
 * 5. You can access form data via FormData API
 *
 * Layout:
 * - space-y-l: Large vertical spacing between form fields
 *   Uses design system spacing token (--spacing-l)
 *   Creates consistent gaps between FormField components
 *
 * Server-side validation support:
 * - Set serverInvalid={true} on Form.Field for server errors
 * - Use onClearServerErrors callback to reset errors before resubmission
 * - Use forceMatch prop on Form.Message to show server errors
 *
 * Usage:
 * <FormRoot onSubmit={(e) => {
 *   e.preventDefault();
 *   const formData = new FormData(e.currentTarget);
 *   const data = Object.fromEntries(formData);
 *   // Handle submission
 * }}>
 *   <FormField name="email">...</FormField>
 *   <FormField name="message">...</FormField>
 *   <FormSubmit>Submit</FormSubmit>
 * </FormRoot>
 *
 * With server validation:
 * <FormRoot
 *   onSubmit={handleSubmit}
 *   onClearServerErrors={() => setErrors({})}
 * >
 *   <FormField name="email" serverInvalid={errors.email}>
 *     ...
 *   </FormField>
 * </FormRoot>
 *
 * Accessing form data:
 * - e.currentTarget is the form element
 * - new FormData(e.currentTarget) creates FormData object
 * - Object.fromEntries(formData) converts to plain object
 * - Each field's name prop becomes a key in the object
 *
 * @param children - Form fields, controls, and submit button
 * @param className - Additional CSS classes to merge with default spacing
 * @param onSubmit - Form submission handler (called after validation passes)
 * @param onClearServerErrors - Callback to clear server errors before resubmission
 * @param props - All other props passed to native <form> element
 */
export const FormRoot = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof FormPrimitive.Root>) => {
  return (
    <FormPrimitive.Root className={cn("space-y-l", className)} {...props}>
      {children}
    </FormPrimitive.Root>
  );
};
