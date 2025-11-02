<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'user_id', 'main_visual_id', 'slug', 'lead'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mainVisual(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'main_visual_id');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
