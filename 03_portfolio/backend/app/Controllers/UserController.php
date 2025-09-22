<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController
{
    // Public endpoint - Get user by ID (minimal info for author display)
    public function show(Request $request): JsonResponse
    {
        $userId = $request->query('id');

        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Return only public user information
        return response()->json([
            'id' => $user->id,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'username' => $user->username,
            'bio' => $user->bio,
            'avatar_id' => $user->avatar_id,
            'created_at' => $user->created_at,
        ]);
    }

    // Protected endpoint - Get authenticated user's own profile (/user/me)
    public function me(): JsonResponse
    {
        /** @var User|null $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Return full user information (including email and role)
        return response()->json([
            'id' => $user->id,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'username' => $user->username,
            'userRole' => $user->userRole,
            'bio' => $user->bio,
            'avatar_id' => $user->avatar_id,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ]);
    }

    // Admin-only endpoint - Get all users
    public function index(): JsonResponse
    {
        /** @var User|null $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($user->userRole !== 'admin') {
            return response()->json(['error' => 'Admin access required'], 403);
        }

        $users = User::all();

        return response()->json(['users' => $users]);
    }

    // Create a new user
    public function create(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|max:50|unique:users,username',
            'password' => 'required|string|min:8|confirmed',
            'userRole' => 'sometimes|string|in:admin,member',
            'bio' => 'nullable|string|max:500',
            'avatar_id' => 'nullable|integer|exists:images,id',
        ]);

        $validatedData['userRole'] = $validatedData['userRole'] ?? 'member';
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json(['user' => $user], 201);
    }

    // Update the authenticated user's profile
    public function update(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validatedData = $request->validate([
            'firstName' => 'sometimes|string|max:255',
            'lastName' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
            'username' => ['sometimes', 'string', 'max:50', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|string|min:8|confirmed',
            'userRole' => [
                'sometimes',
                'string',
                'in:admin,member',
                function ($attribute, $value, $fail) use ($user) {
                    // Only admins can change roles
                    if ($user->userRole !== 'admin' && $value !== $user->userRole) {
                        $fail('You do not have permission to change user roles.');
                    }
                }
            ],
            'bio' => 'nullable|string|max:500',
            'avatar_id' => 'nullable|integer|exists:images,id',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json(['user' => $user], 200);
    }

    // Delete the authenticated user's account
    public function destroy(): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
