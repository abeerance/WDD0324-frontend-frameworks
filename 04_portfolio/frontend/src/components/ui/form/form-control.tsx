import * as FormPrimitive from "@radix-ui/react-form";
import { ComponentPropsWithoutRef } from "react";

/**
 * Form Control wrapper component
 *
 * Wraps Radix UI's Form.Control primitive to automatically handle:
 * - Accessibility attributes (aria-invalid, aria-describedby)
 * - Connection to Form.Field for automatic ID/name management
 * - Validation state propagation to child input/textarea
 * - Focus management
 *
 * Usage:
 * <FormControl>
 *   <Input type="text" required />
 * </FormControl>
 *
 * The asChild prop tells Radix to merge its props with the child component
 * instead of rendering its own element. This allows you to pass any input
 * component (Input, Textarea, Select, etc.) as children while keeping all
 * Radix Form functionality.
 *
 * What Radix adds automatically:
 * - aria-invalid="true/false" based on validation state
 * - aria-describedby pointing to error messages
 * - name attribute from parent Form.Field
 * - id attribute for label association
 * - onChange/onBlur handlers for validation
 *
 * @param children - Your custom input component (Input, Textarea, etc.)
 * @param props - All other props passed to Radix Form.Control
 */
export const FormControl = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof FormPrimitive.Control>) => {
  return (
    <FormPrimitive.Control asChild {...props}>
      {children}
    </FormPrimitive.Control>
  );
};
