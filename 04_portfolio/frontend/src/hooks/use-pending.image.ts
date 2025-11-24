import { extractTempIds } from "@/lib/utils/note-form";
import type { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";

/**
 * Custom Hook: usePendingImages
 *
 * WHAT IS A CUSTOM HOOK?
 * A custom hook is a reusable function that encapsulates stateful logic and side effects.
 * It allows you to share logic across multiple components without prop drilling or higher-order components.
 * Custom hooks can call other hooks (useState, useEffect, etc.) and must follow the Rules of Hooks.
 *
 * NAMING CONVENTION:
 * - Must start with "use" prefix (React requirement for hooks)
 * - Use camelCase for the rest of the name
 * - Name should describe what the hook manages or does
 * - Example: usePendingImages, useAuth, useFetch, useLocalStorage
 *
 * PURPOSE OF THIS HOOK:
 * Manages the lifecycle of images inserted into the Tiptap editor before form submission.
 * Tracks which images need to be uploaded and automatically cleans up deleted images.
 * This is essential for the deferred upload pattern where images are only uploaded on form submit.
 *
 * @param content - The current Tiptap editor content (JSONContent format)
 * @returns Object containing the pending images map and the handler for adding new images
 */
export const usePendingImages = (content: JSONContent) => {
  /**
   * Stores images waiting to be uploaded on form submission
   * Key: temporary ID assigned when image is inserted in editor
   * Value: File object to upload later
   */
  const [pendingImages, setPendingImages] = useState<Map<string, File>>(new Map());

  /**
   * Handles new image insertion in the editor
   * Adds the image file to the pending upload queue with its temporary ID
   *
   * @param tempId - Temporary unique identifier for the image
   * @param file - The image file to be uploaded later
   */
  const handleEditorImageSelect = (tempId: string, file: File) => {
    setPendingImages((prev) => new Map(prev).set(tempId, file));
  };

  /**
   * Effect: Synchronize pending images with current editor content
   *
   * WHAT IT DOES:
   * - Extracts all temporary image IDs currently in the editor
   * - Removes any pending images that are no longer in the editor
   * - This cleanup prevents uploading images the user has deleted
   *
   * WHY IT'S NEEDED:
   * If a user inserts an image then deletes it before submitting,
   * we shouldn't upload that file. This effect keeps the upload queue
   * in sync with what's actually visible in the editor.
   *
   * DEPENDENCIES:
   * - [content]: Re-runs whenever editor content changes
   */
  useEffect(() => {
    // Extract all temporary IDs from current editor content
    const currentTempIds = extractTempIds(content);
    const currentTempIdSet = new Set(currentTempIds);

    // Clean up pendingImages - remove entries not in current content
    setPendingImages((prev) => {
      const updated = new Map(prev);
      let hasChanges = false;

      // Check each pending image
      for (const tempId of prev.keys()) {
        // If the image is no longer in the editor, remove it from upload queue
        if (!currentTempIdSet.has(tempId)) {
          updated.delete(tempId);
          hasChanges = true;
        }
      }

      // Only update state if something changed (optimization)
      return hasChanges ? updated : prev;
    });
  }, [content]);

  return {
    /** Map of images waiting to be uploaded (tempId -> File) */
    pendingImages,
    /** Handler for adding a new image to the pending queue */
    handleEditorImageSelect,
  };
};
