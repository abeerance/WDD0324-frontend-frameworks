"use server";

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/validations/auth";
import { AuthError } from "next-auth";

/**
 * Login Server Action
 *
 * WHY SERVER ACTIONS?
 * - Runs on the server, keeping sensitive logic away from the client
 * - No need to create API routes manually
 * - Built-in security: CSRF protection, encrypted responses
 * - Type-safe communication between client and server
 * - Can be called directly from Client Components
 *
 * FLOW:
 * 1. Receives form data from AuthForm component
 * 2. Validates credentials format with Zod schema
 * 3. Calls NextAuth's signIn function
 * 4. NextAuth triggers our authorize() function in auth config
 * 5. authorize() communicates with Laravel API
 * 6. Returns success or error to the client
 *
 * WHY VALIDATE TWICE (client + server)?
 * - Client validation: Better UX, instant feedback
 * - Server validation: Security - never trust client data
 *
 * @param formData - FormData object containing username and password
 * @returns Object with either success flag or error message
 */
export async function loginAction(formData: FormData) {
  // Extract credentials from FormData
  // FormData.get() returns FormDataEntryValue (string | File), so we need validation
  const username = formData.get("username");
  const password = formData.get("password");

  // Server-side validation using Zod schema
  // This is CRITICAL - never trust data from the client
  const validatedFields = loginSchema.safeParse({
    username,
    password,
  });

  // If validation fails, return error immediately
  if (!validatedFields.success) {
    return { error: "Invalid credentials format" };
  }

  try {
    // Call NextAuth's signIn function with credentials provider
    // redirect: false prevents automatic redirect, letting us handle it manually
    // This triggers the authorize() function in our auth config
    await signIn("credentials", {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: false, // We handle redirect manually in the client component
    });

    // If no error thrown, login was successful
    return { success: true };
  } catch (error) {
    // NextAuth throws specific AuthError types for different failures
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          // This fires when authorize() returns null
          // (invalid credentials from Laravel API)
          return { error: "Invalid username or password" };
        default:
          // Catch-all for other auth errors (network issues, etc.)
          return { error: "Something went wrong, please try again" };
      }
    }

    // Re-throw unexpected errors for proper error handling
    throw error;
  }
}
