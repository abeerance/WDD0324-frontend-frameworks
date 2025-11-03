"use server";

/**
 * Server Action: Register User
 *
 * WHY SERVER ACTIONS?
 * - Runs on the server, never exposes API credentials to client
 * - No need to create separate API route files
 * - Automatic POST request handling by Next.js
 * - Type-safe communication between client and server
 *
 * FLOW:
 * 1. Client calls registerAction(formData) from RegisterForm
 * 2. Next.js sends request to server
 * 3. Server action extracts FormData and calls Laravel API
 * 4. Returns result object back to client
 *
 * ERROR HANDLING:
 * - API errors (400, 422, etc.): Return error message from Laravel
 * - Network errors: Return generic error message
 * - Client checks result.error to show appropriate toast
 *
 * SECURITY:
 * - API_URL stored in .env.local (never exposed to browser)
 * - "use server" directive ensures this only runs server-side
 */
export async function registerAction(formData: FormData) {
  // Extract form fields from FormData object
  // FormData.get() returns string | File | null
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");

  try {
    // Call Laravel API registration endpoint
    // process.env.API_URL is only accessible server-side
    const response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        password_confirmation,
      }),
    });

    // Parse JSON response from Laravel
    const data = await response.json();

    // Check if request failed (status code 400+)
    // Laravel returns error details in data.message
    if (!response.ok) {
      return {
        error: data.message || "Registration failed. Please try again",
      };
    }

    // Success case - return success flag
    // Client will show success toast and switch to login form
    return { success: true };
  } catch (error) {
    // Network errors, JSON parse errors, or other exceptions
    console.error("Registration error: ", error);
    return {
      error: "An unexpected error ocurred. Please try again", // Typo note: "ocurred" should be "occurred"
    };
  }
}
