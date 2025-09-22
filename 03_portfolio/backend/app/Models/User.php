<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'username',
        'password',
        'userRole',
        'bio',
        'avatar_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // Define the one-to-many relationship with notes (blog posts)
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }


    // Define the one-to-many relationship with images
    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }
}
