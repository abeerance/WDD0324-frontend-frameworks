"use server";

import { fetchApi } from "@/lib/api/api-fetch";
import type { Note } from "@/lib/api/notes/notes";
import { auth } from "@/lib/auth";
import type { EditNoteFormData } from "@/schemas/note/edit-note";
import { redirect } from "next/navigation";

interface UpdateNoteResponse {
  note: Note;
}

export async function updateNoteAction(noteId: number, data: EditNoteFormData) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/admin");
  }

  // extract JWT token from Auth.js session
  const token = session.user.accessToken;

  if (!token) {
    return {
      success: false,
      error: "Authentication token not found",
    };
  }

  const response = await fetchApi<UpdateNoteResponse>(`note/${noteId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.error || !response.data) {
    return {
      success: false,
      error: "There was something wrong, please try again",
    };
  }

  return {
    success: true,
    note: response.data.note,
  };
}

interface UploadImageResponse {
  images: Array<{
    id: number;
    url: string;
    name: string;
  }>;
}

export async function uploadImageAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/admin");
  }

  // extract JWT token from Auth.js session
  const token = session.user.accessToken;

  if (!token) {
    return {
      success: false,
      error: "Authentication token not found",
    };
  }

  const response = await fetchApi<UploadImageResponse>("uploads", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.error || !response.data) {
    return {
      success: false,
      error: "Image not uploaded successfully, please try again",
    };
  }

  return {
    success: true,
    images: response.data.images,
  };
}
