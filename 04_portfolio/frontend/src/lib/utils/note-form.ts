import type { JSONContent } from "@tiptap/react";

/**
 * Utility Function: extractTempIds
 *
 * WHAT IS A UTILITY FUNCTION?
 * A utility function is a pure, reusable helper function that performs a specific task.
 * Unlike custom hooks, utilities don't manage state or side effects - they just transform data.
 * They can be used anywhere (components, hooks, server code) without restrictions.
 *
 * PURPOSE:
 * Recursively traverses a Tiptap editor content tree to find all images with temporary IDs.
 * This is used to track which images in the editor are pending upload.
 *
 * HOW IT WORKS:
 * 1. Checks if current node is an image with a tempId attribute
 * 2. If yes, adds the tempId to the results array
 * 3. Recursively processes all child nodes
 * 4. Returns a flat array of all temporary IDs found
 *
 * @param node - A Tiptap JSONContent node (can be the root document or any child node)
 * @returns Array of temporary image IDs found in the content tree
 *
 * @example
 * const content = { type: "doc", content: [{ type: "image", attrs: { tempId: "temp-123" }}] };
 * const tempIds = extractTempIds(content); // ["temp-123"]
 */
export const extractTempIds = (node: JSONContent): string[] => {
  /** Accumulator array for collecting temporary IDs */
  const ids: string[] = [];

  // Check if this node is an image with a temporary ID
  if (node.type === "image" && node.attrs?.tempId) {
    ids.push(node.attrs.tempId);
  }

  // Recursively process all child nodes if they exist
  if (node.content) {
    for (const child of node.content) {
      // Spread operator merges child results into parent array
      ids.push(...extractTempIds(child));
    }
  }

  return ids;
};

/**
 * Utility Function: replaceImageReferences
 *
 * PURPOSE:
 * Recursively walks through Tiptap content and replaces temporary image IDs
 * with real uploaded image IDs and URLs after successful upload.
 *
 * This is the final step in the deferred upload pattern:
 * 1. User inserts image → gets temporary ID
 * 2. User submits form → images upload to server
 * 3. This function → replaces temp IDs with real database IDs
 *
 * HOW IT WORKS:
 * 1. Maps over all content nodes
 * 2. For image nodes with tempId, looks up the uploaded image data
 * 3. Replaces tempId with real image_id and adds the uploaded URL
 * 4. Recursively processes nested content
 * 5. Returns a new content tree with updated references
 *
 * @param content - The Tiptap editor content to process
 * @param imageIdMap - Map of temporary IDs to uploaded image data (id and url)
 * @returns New content tree with temporary IDs replaced by real IDs and URLs
 *
 * @example
 * const imageMap = new Map([["temp-123", { id: 456, url: "https://..." }]]);
 * const updated = replaceImageReferences(content, imageMap);
 * // Image node now has: { attrs: { image_id: 456, src: "https://..." }}
 */
export const replaceImageReferences = (
  content: JSONContent,
  imageIdMap: Map<string, { id: number; url: string }>
): JSONContent => {
  // Base case: if node has no children, return as-is
  if (!content.content) return content;

  // Process each child node
  const newContent = content.content.map((node) => {
    // Handle image nodes with tempId (NEW images that need replacement)
    if (node.type === "image" && node.attrs?.tempId) {
      // Look up the uploaded image data using the temporary ID
      const imageData = imageIdMap.get(node.attrs.tempId);

      if (imageData) {
        // Return new node with real ID and URL, preserving other attributes
        return {
          ...node,
          attrs: {
            ...node.attrs,
            image_id: imageData.id, // Real database ID
            src: imageData.url, // Uploaded image URL
          },
        };
      }
    }

    // Recursively process nodes with nested content (like paragraphs, lists, etc.)
    if (node.content) {
      return {
        ...node,
        content: replaceImageReferences({ content: node.content } as JSONContent, imageIdMap)
          .content,
      };
    }

    // Return all other nodes unchanged (text, headings, existing images without tempId)
    return node;
  });

  // Return new content object with processed children
  return {
    ...content,
    content: newContent,
  };
};
