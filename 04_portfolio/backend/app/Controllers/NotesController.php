<?php

namespace App\Controllers;

use App\Models\Note;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class NotesController
{
    // Retrieve notes with optional filtering
    public function index(Request $request): JsonResponse
    {
        $query = Note::with(['tags', 'mainVisual']);

        // Apply filters
        $query->when($request->filled('id'), fn($q) => $q->where('id', $request->input('id')));
        $query->when($request->filled('title'), fn($q) => $q->where('title', 'like', '%' . $request->input('title') . '%'));
        $query->when($request->filled('lead'), fn($q) => $q->where('lead', 'like', '%' . $request->input('lead') . '%'));
        $query->when($request->filled('user_id'), fn($q) => $q->where('user_id', $request->input('user_id')));
        $query->when($request->filled('slug'), fn($q) => $q->where('slug', $request->input('slug')));
        $query->when($request->filled('tag_ids'), function ($q) use ($request) {
            $tagIds = explode(',', $request->input('tag_ids'));
            $q->whereHas('tags', fn($q) => $q->whereIn('tag_id', $tagIds), '>=', count($tagIds));
        });

        // tag name filtering
        $query->when($request->filled('tag_names'), function ($q) use ($request) {
            $tagNames = explode(',', $request->input('tag_names'));
            $tagNames = array_map('strtolower', $tagNames);

            $q->whereHas('tags', function ($tagQuery) use ($tagNames) {
                $tagQuery->whereRaw('LOWER(tags.name) IN (' . implode(',', array_fill(0, count($tagNames), '?')) . ')', $tagNames);
            }, '>=', count($tagNames));
        });

        // Apply ordering
        $query->orderBy(
            $request->input('order_by', 'created_at'),
            $request->input('order_dir', 'asc')
        );

        // Apply pagination
        $result = $query->paginate(
            $request->input('limit', 10),
            ['*'],
            'page',
            $request->input('page', 1)
        );

        return response()->json($result);
    }

    // Create a new note
    public function create(Request $request): JsonResponse
    {
        // Validate request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'lead' => 'required|string|max:500',
            'content' => 'required|array',
            'main_visual_id' => 'nullable|integer|exists:images,id',
            'tags' => 'required|array|min:1',
            'tags.*' => 'string|max:255',
        ]);

        // Check image ownership if main_visual_id is provided
        if (isset($validatedData['main_visual_id']) && !$this->ownsImage($validatedData['main_visual_id'])) {
            throw ValidationException::withMessages(['main_visual_id' => 'You do not have permission to use this image.']);
        }

        // Validate that user owns all images referenced in content
        $this->validateContentImages($validatedData['content']);

        // Convert content to JSON after validation
        $validatedData['content'] = json_encode($validatedData['content']);

        // Generate the slug with date prefix
        $slug = $this->generateDateSlug($validatedData['title']);
        $validatedData['slug'] = $slug;

        // Remove tags from validated data before creating note
        $tags = $validatedData['tags'];
        unset($validatedData['tags']);

        // Create the note
        $note = Auth::user()->notes()->create($validatedData);

        // Handle tags - create/find and attach them
        $this->attachTagsToNote($note, $tags);

        // Load the note with its relationships for the response
        $note->load(['tags', 'mainVisual']);

        return response()->json(['note' => $note], 201);
    }

    // Update an existing note
    public function update(Request $request, $id): JsonResponse
    {
        $note = Auth::user()->notes()->findOrFail($id);

        // Validate request data
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'lead' => 'sometimes|string|max:500',
            'content' => 'sometimes|array',
            'main_visual_id' => 'nullable|integer|exists:images,id',
            'tags' => 'sometimes|array|min:1',
            'tags.*' => 'string|max:255',
        ]);

        // Check image ownership if main_visual_id is provided
        if (isset($validatedData['main_visual_id']) && !$this->ownsImage($validatedData['main_visual_id'])) {
            throw ValidationException::withMessages(['main_visual_id' => 'You do not have permission to use this image.']);
        }

        // Handle content updates and cleanup orphaned images
        if (isset($validatedData['content'])) {
            $this->validateContentImages($validatedData['content']);
            $newContentImageIds = $this->getContentImageIds($validatedData['content']);

            // Clean up orphaned images before updating
            $this->cleanupOrphanedImages($id, $newContentImageIds);

            $validatedData['content'] = json_encode($validatedData['content']);
        }

        // Update the slug if title is changed
        if (isset($validatedData['title'])) {
            $validatedData['slug'] = $this->generateDateSlug($validatedData['title']);
        }

        // Handle tags if provided
        if (isset($validatedData['tags'])) {
            $tags = $validatedData['tags'];
            unset($validatedData['tags']);
            $this->attachTagsToNote($note, $tags);
        }

        // Update the note
        $note->update($validatedData);

        // Load the note with its relationships for the response
        $note->load(['tags', 'mainVisual']);

        return response()->json(['note' => $note], 200);
    }

    // Delete a note
    public function destroy($id): JsonResponse
    {
        $note = Auth::user()->notes()->findOrFail($id);
        $note->delete();

        return response()->json(['message' => 'Note deleted successfully'], 200);
    }

    /**
     * Helper method to attach tags to a note
     */
    private function attachTagsToNote($note, array $tagNames): void
    {
        $tagIds = [];

        foreach ($tagNames as $tagName) {
            $tag = \App\Models\Tag::firstOrCreate(
                ['name' => $tagName],
                ['name' => $tagName]
            );

            $tagIds[] = $tag->id;
        }

        $note->tags()->sync($tagIds);
    }

    // Helper function to check if the user owns the image
    private function ownsImage(int $imageId): bool
    {
        return Auth::user()->images()->where('id', $imageId)->exists();
    }

    /**
     * Generate a slug with the current date as prefix
     */
    private function generateDateSlug(string $title): string
    {
        $datePrefix = date('Y-m-d');
        $titleSlug = Str::slug($title);
        return $datePrefix . '-' . $titleSlug;
    }

    // Extract and validate image references from TipTap content
    private function validateContentImages(array $content): void
    {
        $this->extractImageIds($content, function ($imageId) {
            if (!$this->ownsImage($imageId)) {
                throw ValidationException::withMessages([
                    'content' => "You do not have permission to use image with ID: {$imageId}"
                ]);
            }
        });
    }

    // Recursively extract image IDs from TipTap content structure
    private function extractImageIds(array $content, callable $callback): void
    {
        foreach ($content as $node) {
            if (is_array($node)) {
                // Check if this is an image node
                if (isset($node['type']) && $node['type'] === 'image' && isset($node['attrs']['image_id'])) {
                    $callback($node['attrs']['image_id']);
                }

                // Recursively check nested content
                if (isset($node['content']) && is_array($node['content'])) {
                    $this->extractImageIds($node['content'], $callback);
                }
            }
        }
    }

    // Get all image IDs from TipTap content
    private function getContentImageIds(array $content): array
    {
        $imageIds = [];
        $this->extractImageIds($content, function ($imageId) use (&$imageIds) {
            $imageIds[] = $imageId;
        });
        return array_unique($imageIds);
    }

    // Clean up orphaned images when content changes
    private function cleanupOrphanedImages(int $noteId, array $newContentImageIds): void
    {
        // Get the old content to find previously used images
        $note = Note::find($noteId);
        if (!$note)
            return;

        $oldContent = json_decode($note->content, true);
        if (!$oldContent)
            return;

        $oldContentImageIds = $this->getContentImageIds($oldContent);

        // Find images that were removed from content
        $removedImageIds = array_diff($oldContentImageIds, $newContentImageIds);

        // Delete orphaned images that are not main visuals and not used elsewhere
        foreach ($removedImageIds as $imageId) {
            $image = Image::find($imageId);
            if (!$image || $image->user_id !== Auth::id())
                continue;

            // Check if image is used as main visual for any note
            $isMainVisual = Note::where('main_visual_id', $imageId)->exists();

            // Check if image is used in other notes' content
            $isUsedElsewhere = Note::where('id', '!=', $noteId)
                ->where('content', 'LIKE', "%\"image_id\":{$imageId}%")
                ->exists();

            // Only delete if not used anywhere else
            if (!$isMainVisual && !$isUsedElsewhere) {
                // Delete physical file
                $pathname = str_replace('/storage/', '', $image->url);
                if (Storage::disk('public')->exists($pathname)) {
                    Storage::disk('public')->delete($pathname);
                }

                // Delete database record
                $image->delete();
            }
        }
    }
}
