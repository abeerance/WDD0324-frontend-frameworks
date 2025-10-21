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
