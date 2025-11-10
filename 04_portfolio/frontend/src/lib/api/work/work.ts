import { fetchApi } from "../api-fetch";

/**
 * TYPE DEFINITIONS
 */

/**
 * Project Type
 *
 * Represents a portfolio project with all its associated data.
 * Projects are the main content type for the work/portfolio section.
 */
export interface Project {
  id: number;
  title: string; // Project name
  lead: string; // Short description/summary (shown in overview)
  created_at: string; // ISO date string for when project was created
  slug: string; // URL-friendly identifier (format: YYYY-MM-DD-project-title)
  main_visual: {
    id: number;
    url: string; // Image URL (Unsplash or uploaded)
    name: string; // Image description/alt text
  };
  user_id: number; // ID of the user who created the project
}

/**
 * User Type
 *
 * Represents a user/team member who creates projects.
 * Used to display author information in project metadata.
 */
export interface User {
  id: number;
  username: string; // Unique username for login
  firstName: string; // Display name (first part)
  lastName: string; // Display name (last part)
}

/**
 * API Response Wrappers
 *
 * Laravel API wraps responses in a "data" property.
 * These interfaces match the expected API response structure.
 */
export interface ProjectsResponse {
  data: Project[];
}

export interface UserResponse {
  data: User;
}

/**
 * API FUNCTIONS
 */

/**
 * Fetches all projects from the API
 *
 * Used for displaying project lists/grids on the main work page.
 * Results are cached for 60 seconds using Next.js revalidation.
 *
 * @returns Promise resolving to ProjectsResponse containing array of projects
 * @throws Error if the API request fails or returns an error
 *
 * @example
 * const response = await getProjects();
 * const projects = response.data;
 */
export async function getProjects() {
  const response = await fetchApi<ProjectsResponse>("projects", {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (response.error) {
    throw new Error(response.error);
  }

  // Response includes { data: Project[] }
  return response.data;
}

/**
 * Fetches a single project by its slug
 *
 * Used for project detail pages where the slug is in the URL.
 * Slug format: YYYY-MM-DD-project-title (e.g., "2025-03-01-ecommerce-platform")
 *
 * Results are cached for 60 seconds using Next.js revalidation.
 *
 * @param slug - URL-friendly project identifier
 * @returns Promise resolving to ProjectsResponse with single project, or null if not found
 *
 * @example
 * const response = await getProjectBySlug("2025-03-01-ecommerce-platform");
 * if (response) {
 *   const project = response.data[0];
 * }
 */
export async function getProjectBySlug(slug: string) {
  const response = await fetchApi<ProjectsResponse>(`projects?slug=${slug}`, {
    next: { revalidate: 60 },
  });

  // Return null if error, no data, or empty array
  // This allows calling code to handle "not found" cases cleanly
  if (response.error || !response.data || response.data.data.length === 0) {
    return null;
  }

  // Return first project directly (slugs are unique, so only one match)
  return response.data.data[0];
}

/**
 * Fetches a single user by their ID
 *
 * Used to display project author/team member information on detail pages.
 * Results are cached for 60 seconds using Next.js revalidation.
 *
 * @param userId - Unique user identifier
 * @returns Promise resolving to User object, or null if not found
 *
 * @example
 * const user = await getUserById(project.user_id);
 * if (user) {
 *   console.log(`${user.firstName} ${user.lastName}`);
 * }
 */
export async function getUserById(userId: number) {
  const response = await fetchApi<User>(`user?id=${userId}`, {
    next: { revalidate: 60 },
  });

  // Return null if error or no data
  // Allows graceful handling when user doesn't exist
  if (response.error || !response.data) {
    return null;
  }

  // Return user object directly (not wrapped in response.data)
  return response.data;
}
