<?php

use App\Controllers\NotesController;
use App\Controllers\AuthController;
use App\Controllers\CommentsController;
use App\Controllers\TagsController;
use App\Controllers\UploadsController;
use App\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/user', [UserController::class, 'show']);
// Add this to your public routes:
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/notes', [NotesController::class, 'index']);
Route::get('/tags', [TagsController::class, 'index']);
Route::get('/uploads', [UploadsController::class, 'index']);

// User endpoints (protected)
Route::middleware(['auth:sanctum'])->group(function () {
    // User routes
    Route::get('/user/me', [UserController::class, 'me']);
    Route::patch('/user/me', [UserController::class, 'update']);
    Route::delete('/user/me', [UserController::class, 'destroy']);

    // Admin-only routes
    Route::get('/users', [UserController::class, 'index']); // All users

    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Note routes
    Route::post('/notes', [NotesController::class, 'create']);
    Route::patch('/notes/{id}', [NotesController::class, 'update']);
    Route::delete('/notes/{id}', [NotesController::class, 'destroy']);

    // Tag routes
    Route::put('/notes/{id}/tags', [TagsController::class, 'assign']); // Assign tags to a note

    // Upload routes
    Route::post('/uploads', [UploadsController::class, 'create']);
    Route::delete('/uploads/{id}', [UploadsController::class, 'destroy']);
});
