<?php
namespace App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Image;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UploadsController
{
    // Fetch image details by ID
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'image_id' => ['required', 'integer', 'exists:images,id'],
        ]);

        $image = Image::findOrFail($request->query('image_id'));

        return response()->json($image, 200);
    }

    // Handle image uploads for avatars or notes
    public function create(Request $request): JsonResponse
    {
        $user = Auth::user();

        // Validate uploaded files and type (avatar or note image)
        $validatedData = $request->validate([
            'files.*' => ['required', 'file', 'max:10240'], // Max 10MB per file
            'files' => ['required', 'array', 'max:5'],      // Max 5 files
            'note_id' => ['nullable', 'integer', 'exists:notes,id'], // Required if type is note
        ], [
            'files.*.max' => 'Each file may not exceed 10 MB.',
            'files.max' => 'You may not upload more than 5 files.',
        ]);

        $uploadedImages = [];
        $type = $request->post('type');
        Log::info("Uploading {$type} image for user {$user->username}");

        foreach ($request->file('files') as $file) {
            $originalFilename = $file->getClientOriginalName();
            $filename = pathinfo($originalFilename, PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();

            // Clean filename: remove spaces, parentheses, and special characters
            $cleanFilename = preg_replace('/[^A-Za-z0-9\-_]/', '_', $filename);

            // Generate unique filename with clean name
            $uniqueFilename = $cleanFilename . '_' . Str::random(16) . '.' . $extension;
            $pathname = "uploads/{$user->username}/{$uniqueFilename}";

            // Store the file in public disk
            $file->storeAs("uploads/{$user->username}", $uniqueFilename, 'public');

            // Generate full HTTP URL
            $fullUrl = url(Storage::url($pathname));

            // Create image record in the database
            $image = Image::create([
                'url' => $fullUrl,
                'name' => $request->post('title') ?: $originalFilename,
                'user_id' => $user->id,
                'note_id' => $type === 'note' && isset($validatedData['note_id']) ? $validatedData['note_id'] : null,
            ]);

            // If it's an avatar, update the user's avatar_id
            if ($type === 'avatar') {
                $user->update(['avatar_id' => $image->id]);
            }

            $uploadedImages[] = $image;
        }

        return response()->json(['images' => $uploadedImages], 201);
    }

    // Delete an image by ID
    public function destroy($id): JsonResponse
    {
        $user = Auth::user();

        // Find the image and ensure it belongs to the authenticated user
        $image = Image::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        // Extract the path from the URL to delete the file from storage
        $pathname = str_replace('/storage/', '', $image->url);

        if (Storage::disk('public')->exists($pathname)) {
            Storage::disk('public')->delete($pathname);
        }

        // Delete the image record from the database
        $image->delete();

        return response()->json(['deleted' => $pathname, 'id' => $id], 200);
    }
}
