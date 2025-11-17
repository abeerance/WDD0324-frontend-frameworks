"use server";

import { fetchApi } from "@/lib/api/api-fetch";
import type { Note } from "@/lib/api/notes/notes";
import { auth } from "@/lib/auth";
import type { CreateNoteFormData } from "@/schemas/note/create-note";
import { redirect } from "next/navigation";

/**
 * API response structure from Laravel backend
 */
interface CreateNoteResponse {
  note: Note;
}

/**
 * Server Action: Create Note
 *
 * Handles authenticated note creation with the Laravel API backend
 *
 * Process:
 * 1. Authenticates user via Auth.js session
 * 2. Extracts bearer token from session
 * 3. Sends POST request to Laravel via fetchApi utility
 * 4. Returns created note or error message
 *
 * @param data - Validated note data (title, lead, content, main_visual_id, tags)
 * @returns Success object with note data OR failure object with error message
 */
export async function createNoteAction(data: CreateNoteFormData) {
  const session = await auth();

  // Redirect unauthenticated users to admin login
  if (!session || !session.user) {
    redirect("/admin");
  }

  // Extract JWT token from Auth.js session
  const token = session.user.accessToken;

  if (!token) {
    return {
      success: false,
      error: "Authentication token not found",
    };
  }

  /**
   * POST to Laravel /notes endpoint via fetchApi
   * Authorization: Bearer token for authenticated requests
   * Body: JSON stringified note data
   */
  const response = await fetchApi<CreateNoteResponse>("notes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // Handle API errors from fetchApi response
  if (response.error || !response.data) {
    // Extract detailed Laravel validation errors from errorData
    let errorMessage = response.error || "Failed to create note";

    if (response.errorData && typeof response.errorData === "object") {
      const errorObj = response.errorData as Record<string, unknown>;

      // Laravel returns validation errors in "message" or "errors" fields
      if (errorObj.message && typeof errorObj.message === "string") {
        errorMessage = errorObj.message;
      } else if (errorObj.errors && typeof errorObj.errors === "object") {
        const errors = errorObj.errors as Record<string, string[]>;
        const firstError = Object.values(errors)[0];
        if (firstError && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }

  return {
    success: true,
    note: response.data.note,
  };
}

/**
 * API response structure for image uploads from Laravel
 */
interface UploadImageResponse {
  images: Array<{
    id: number;
    url: string;
    name: string;
  }>;
}

/**
 * Server Action: Upload Image
 *
 * Handles image file uploads to Laravel storage
 *
 * Process:
 * 1. Authenticates user session
 * 2. Sends multipart/form-data to Laravel via fetchApi
 * 3. Returns image metadata (id, url, name)
 *
 * Laravel validates: max 5 files, 10MB each
 *
 * @param formData - FormData with files under 'files[]' key
 * @returns Success object with image metadata OR failure object with error
 */
export async function uploadImageAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/admin");
  }

  const token = session.user.accessToken;

  if (!token) {
    return {
      success: false,
      error: "Authentication token not found",
    };
  }

  /**
   * POST to Laravel /uploads endpoint via fetchApi
   * Authorization: Bearer token for authenticated requests
   * Body: FormData (fetchApi handles Content-Type for multipart/form-data)
   */
  const response = await fetchApi<UploadImageResponse>("uploads", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.error || !response.data) {
    // Extract detailed Laravel validation errors from errorData
    let errorMessage = response.error || "Failed to upload images";

    if (response.errorData && typeof response.errorData === "object") {
      const errorObj = response.errorData as Record<string, unknown>;

      // Laravel returns validation errors in "message" or "errors" fields
      if (errorObj.message && typeof errorObj.message === "string") {
        errorMessage = errorObj.message;
      } else if (errorObj.errors && typeof errorObj.errors === "object") {
        const errors = errorObj.errors as Record<string, string[]>;
        const firstError = Object.values(errors)[0];
        if (firstError && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }

  return {
    success: true,
    images: response.data.images,
  };
}
