/**
 * Standard response structure for API calls
 * @template T The expected data type to be returned from the API
 * @property {T | null} data - The successful response data, typed as T or null if request failed
 * @property {string | null} error - Error message if request failed, null if successful
 * @property {number} statusCode - HTTP status code from the response (or 0 for network errors)
 * @property {unknown} errorData - Parsed error response body from the API, if available
 */
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  statusCode: number;
  errorData?: unknown;
}

/**
 * Reusable backend fetch utility with consistent error handling
 *
 * @template T The expected data type to be returned from the API
 * @param {string} endpoint - The API endpoint to call (will be appended to baseUrl)
 * @param {RequestInit} options - Standard fetch options (method, headers, body, etc.)
 * @returns {Promise<ApiResponse<T>>} A promise that resolves to a standardized response object
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const baseUrl = process.env.API_URL;
  const url = `${baseUrl}/${endpoint}`;

  try {
    // Set default Content-Type, but allow it to be overridden
    const headers: HeadersInit = {
      ...(!(options.body instanceof FormData) && { "Content-Type": "application/json" }),
      ...options.headers,
    };

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      ...options,
      headers,
    });

    const statusCode = response.status;

    if (!response.ok) {
      let errorData: unknown = null;
      try {
        errorData = await response.json();
      } catch {
        // If error response isn't JSON, ignore
      }

      return {
        data: null,
        error: `Request failed with status ${statusCode}`,
        statusCode,
        errorData,
      };
    }

    const data = (await response.json()) as T;

    return {
      data,
      error: null,
      statusCode,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      statusCode: 0,
    };
  }
}
