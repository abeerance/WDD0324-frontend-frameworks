import { z } from "zod";

/**
 * Login Form Validation Schema
 *
 * WHY ZOD?
 * - Type-safe validation with TypeScript inference
 * - Reusable on both client and server
 * - Clear, readable validation rules
 * - Automatic error messages
 *
 * WHERE THIS IS USED:
 * 1. Client-side: React Hook Form validation in AuthForm
 * 2. Server-side: Server Action validation in loginAction
 *
 * VALIDATION RULES:
 * - username: Minimum 3 characters
 * - password: Minimum 3 characters
 *
 * Note: These are minimal checks. The Laravel API performs
 * the actual authentication validation.
 */
export const loginSchema = z.object({
  username: z.string().min(3, "Please enter your username"),
  password: z.string().min(3, "Please enter your password"),
});

/**
 * TypeScript Type inferred from loginSchema
 *
 * This ensures type safety throughout the authentication flow:
 * - React Hook Form useForm<LoginFormData>
 * - Server Action parameters
 * - Any function that handles login data
 *
 * Example inferred type:
 * { username: string; password: string; }
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register Form Validation Schema
 *
 * VALIDATION RULES:
 * - firstName: Minimum 2 characters
 * - lastName: Minimum 2 characters
 * - username: Minimum 3 characters
 * - email: Must be valid email format
 * - password: Minimum 8 characters
 * - password_confirmation: Must match password field
 *
 * REFINE METHOD:
 * .refine() adds custom validation logic that runs after basic field validation
 * - Compares password and password_confirmation fields
 * - If they don't match, attaches error to password_confirmation field
 * - path: ["password_confirmation"] specifies which field shows the error
 *
 * This ensures users see "Passwords do not match" under the confirmation field,
 * not under both password fields or as a general form error.
 */
export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Must be an E-Mail address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
  })
  // Custom validation: password fields must match
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"], // Error appears on confirmation field
  });

/**
 * TypeScript Type inferred from registerSchema
 *
 * Ensures type safety throughout registration flow:
 * - React Hook Form useForm<RegisterFormData>
 * - Server Action parameters
 * - FormData conversion in RegisterForm
 *
 * Example inferred type:
 * {
 *   firstName: string;
 *   lastName: string;
 *   username: string;
 *   email: string;
 *   password: string;
 *   password_confirmation: string;
 * }
 */
export type RegisterFormData = z.infer<typeof registerSchema>;
