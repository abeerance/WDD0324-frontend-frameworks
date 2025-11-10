import { fetchApi } from "../api-fetch";

// Represents a single project with all its associated data
export interface Project {
  id: number;
  title: string;
  lead: string;
  created_at: string;
  slug: string;
  // The main visual/image associated with the project
  main_visual: {
    id: number;
    url: string;
    name: string;
  };
  // The user who created or owns the project
  user_id: number;
}

// API response wrapper containing an array of projects
export interface ProjectsResponse {
  data: Project[];
}

/**
 * Fetches all projects from the API
 * @returns Promise resolving to an array of Project objects
 * @throws Error if the API request fails
 */
export async function getProjects() {
  // Fetch projects with 60-second cache revalidation
  const response = await fetchApi<ProjectsResponse>("projects", {
    next: { revalidate: 60 },
  });

  // Handle API errors by throwing
  if (response.error) {
    throw new Error(response.error);
  }

  return response.data;
}
