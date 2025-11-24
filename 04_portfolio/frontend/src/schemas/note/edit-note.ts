import type { JSONContent } from "@tiptap/react";
import z from "zod";

export const editNoteSchema = z.object({
  title: z
    .string()
    .min(20, "The title needs at least 20 characters")
    .max(255, "Title must be less than 255 characters"),
  lead: z
    .string()
    .min(20, "The lead needs at least 20 characters")
    .max(500, "Lead must be less than 500 characters"),
  /**
   * Validates Tiptap's JSONContent structure
   *
   * Expected format:
   * {
   *   type: "doc",
   *   content: [
   *     { type: "paragraph", content: [...] },
   *     { type: "heading", attrs: { level: 2 }, content: [...] },
   *     { type: "image", attrs: { src: "...", image_id: 123 } },
   *     ...
   *   ]
   * }
   *
   * Validation checks:
   * - Must be an object (not null, array, or primitive)
   * - Root must have type: "doc"
   * - Root must have content property that is an array
   * - Does NOT validate nested node structure (handled by Tiptap)
   */
  content: z.custom<JSONContent>((val) => {
    return (
      typeof val === "object" &&
      val !== null &&
      "type" in val &&
      val.type === "doc" &&
      "content" in val &&
      Array.isArray(val.content)
    );
  }, "Invalid Tiptap content structure"),

  main_visual_id: z.number().int().positive().optional(),
  tags: z.array(
    z.string().min(1, "At least one Tag is required").max(50, "Tag must be less than 50 characters")
  ),
});

export type EditNoteFormData = z.infer<typeof editNoteSchema>;
