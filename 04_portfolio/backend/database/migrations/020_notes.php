<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('lead');
            $table->json('content'); // Tiptap-compatible JSON structure
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('main_visual_id')->nullable()->constrained('images')->nullOnDelete(); // Set to null when image is deleted
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
