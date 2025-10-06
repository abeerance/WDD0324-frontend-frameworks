<?php

namespace App\Controllers;

use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TagsController
{
    // Fetch all tags
    public function index(Request $request): JsonResponse
    {
        return response()->json(Tag::all(), 200);
    }

    // Assign tags to a note (using the note ID from the URL)
    public function assign(Request $request, int $id): JsonResponse
    {
        // Validate request payload (only tag IDs now)
        $validatedData = $request->validate([
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'integer|exists:tags,id',
        ]);

        try {
            // Find the note owned by the authenticated user using the ID from the URL
            $note = Auth::user()->notes()->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            // Return a custom error response if the note is not found or not owned by the user
            throw new HttpException(403, 'You are not allowed to edit this note.');
        }

        // Assign tags to the note (syncing removes any existing tags not in the list)
        $note->tags()->sync($validatedData['tag_ids']);

        return response()->json(['note' => $note->fresh('tags')], 200);
    }
}
