import { useState } from "react";
import type { FieldValues, Path, UseFormSetValue } from "react-hook-form";

/**
 * Options for the useMainVisualUpload hook
 *
 * @template T - Form data type that must extend FieldValues and include main_visual_id
 */
interface UseMainVisualUploadOptions<T extends FieldValues> {
  /** React Hook Form's setValue function for updating form state */
  setValue: UseFormSetValue<T>;
  /** Optional initial preview URL for existing images (used in edit forms) */
  initialPreviewUrl?: string | null;
}

/**
 * Custom Hook: useMainVisualUpload
 *
 * WHAT IS A CUSTOM HOOK?
 * A custom hook is a JavaScript function whose name starts with "use" that can call other hooks.
 * It's a way to extract and reuse stateful logic between components without changing the component hierarchy.
 * Custom hooks follow React's Rules of Hooks and provide a clean way to share logic across multiple components.
 *
 * NAMING CONVENTION:
 * - Always prefix with "use" (e.g., useState, useEffect, useMainVisualUpload)
 * - This "use" prefix tells React this is a hook and should follow hook rules
 * - Use camelCase for the rest of the name
 * - Make the name descriptive of what the hook does
 *
 * PURPOSE OF THIS HOOK:
 * Manages the main visual image upload state and handlers for note forms.
 * Provides file selection, preview URL generation, and form validation integration.
 *
 * @template T - Form data type constrained to FieldValues with main_visual_id field
 * @param options - Configuration object containing setValue and optional initialPreviewUrl
 * @returns Object containing state and handlers for image upload functionality
 */
export const useMainVisualUpload = <T extends FieldValues & { main_visual_id?: number }>({
  setValue,
  initialPreviewUrl,
}: UseMainVisualUploadOptions<T>) => {
  /** Stores the selected file before upload (null if no file selected) */
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /** Stores the preview URL for displaying the image (uses initial URL in edit mode) */
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl || null);

  /**
   * Handles image file selection
   * - Stores the file for later upload
   * - Creates a local object URL for instant preview
   * - Sets temporary ID (1) to pass form validation before actual upload
   *
   * @param file - The selected image file
   */
  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    // Set temporary value to pass validation - replaced with real ID on submit
    setValue("main_visual_id" as Path<T>, 1 as T[Path<T>], {
      shouldValidate: true,
    });
  };

  /**
   * Handles image removal
   * - Clears the selected file
   * - Revokes the object URL to free memory
   * - Clears the preview URL
   * - Sets form field to undefined and triggers validation
   */
  const handleImageRemove = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setValue("main_visual_id" as Path<T>, undefined as T[Path<T>], {
      shouldValidate: true,
    });
  };

  return {
    /** The currently selected file (null if none) */
    selectedFile,
    /** The preview URL for displaying the image */
    previewUrl,
    /** Handler for selecting a new image */
    handleImageSelect,
    /** Handler for removing the current image */
    handleImageRemove,
  };
};
