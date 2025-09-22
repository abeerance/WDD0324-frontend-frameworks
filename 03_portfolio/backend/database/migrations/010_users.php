<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->string('password');
            $table->enum('userRole', ['admin', 'member'])->default('member');
            $table->text('bio')->nullable();
            $table->foreignId('avatar_id')->nullable()->constrained('images')->nullOnDelete();
            $table->timestamps(); // Shortcut for created_at and updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
