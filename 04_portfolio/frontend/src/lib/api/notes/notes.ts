import { fetchApi } from "../api-fetch";

/**
 * Note data structure from the API
 * Contains all properties needed to display a single note including
 * main visual, tags, and author information
 */
export interface Note {
  id: number;
  title: string;
  lead: string;
  slug: string;
  created_at: string;
  main_visual: {
    id: number;
    url: string;
    name: string;
  };
  tags: [{ id: string; name: string }];
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
  user_id: number;
  content: string;
}

/**
 * API response wrapper for notes endpoint
 * The API returns data wrapped in a data property
 */
export interface NotesResponse {
  data: Note[];
}

/**
 * Fetches all notes from the API with 60-second cache revalidation
 * Uses Next.js ISR to keep content fresh without rebuilding entire site
 *
 * @returns {Promise<NotesResponse['data'] | null>} Array of notes or null if fetch fails
 *
 * Note: toast.error() won't work here as this runs server-side
 * Consider throwing error instead for proper error boundary handling
 */
export async function getNotes() {
  const response = await fetchApi<NotesResponse>("notes", {
    next: { revalidate: 60 }, // Revalidate cache every 60 seconds
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return response.data;
}

/**
 * Single note response structure from the API
 * When fetching by slug, the API returns the note data wrapped in a data property
 */
interface NoteResponse {
  data: Note[];
}

/**
 * Fetches a single note by its slug
 *
 * Slug format: YYYY-MM-DD-note-title
 * Example: 2025-03-15-ai-powered-cms
 *
 * The backend filters by slug using the query parameter
 * Returns the first matching note since slugs should be unique
 *
 * Cache strategy: 60-second ISR revalidation to keep content fresh
 *
 * @param slug - The URL-friendly note identifier
 * @returns {Promise<Note | null>} Single note object or null if not found
 *
 * @throws {Error} If the API request fails
 */
export async function getNoteBySlug(slug: string): Promise<Note | null> {
  const response = await fetchApi<NoteResponse>(`notes?slug=${slug}`, {
    next: { revalidate: 60 },
  });

  if (response.error) {
    throw new Error(response.error);
  }

  // Access response.data.data because:
  // - First .data is from fetchApi wrapper
  // - Second .data is from NoteResponse interface
  return response.data?.data?.[0] ?? null;
}
/**
 * Fetches note author/user data by user ID
 *
 * Used to display author information in note metadata
 * Separated from note query for flexibility in caching and permissions
 *
 * @param userId - The ID of the user who created the note
 * @returns {Promise<Note['user'] | null>} User object or null if not found
 */
export async function getUserById(userId: number): Promise<Note["user"] | null> {
  const response = await fetchApi<{ user: Note["user"] }>(`users/${userId}`, {
    next: { revalidate: 3600 }, // Cache user data longer (1 hour)
  });

  if (response.error) {
    return null; // Fail gracefully if user deleted
  }

  return response.data?.user ?? null;
}
