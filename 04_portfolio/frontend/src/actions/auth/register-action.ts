"use server";

import { fetchApi } from "@/lib/api/api-fetch";

/**
 * API response structure from Laravel backend
 */
interface RegisterResponse {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  message?: string;
}

/**
 * Server Action: Register User
 *
 * Handles user registration with the Laravel API backend
 *
 * Process:
 * 1. Extracts form data from FormData object
 * 2. Sends POST request to Laravel registration endpoint via fetchApi
 * 3. Returns success with user data or detailed error
 *
 * Error scenarios:
 * - API failure (422 validation, etc.): Returns API error message
 * - Network error: Returns caught exception message
 *
 * @param formData - FormData containing registration fields
 * @returns Success object with user data OR failure object with error message
 */
export async function registerAction(formData: FormData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");

  const response = await fetchApi<RegisterResponse>("auth/register", {
    method: "POST",
    headers: {
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

  if (response.error || !response.data) {
    return {
      success: false,
      error: response.error || "Registration failed. Please try again",
    };
  }

  return {
    success: true,
    user: response.data.user,
  };
}
