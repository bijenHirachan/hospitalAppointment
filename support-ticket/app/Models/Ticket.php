<?php

namespace App\Models;

use App\Enums\TicketStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'files',
        'priority',
        'status',
        'user_id',
        'assigned_to'
    ];

    protected $casts = [
        'status' => TicketStatusEnum::class
    ];

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }

    public function labels(): BelongsToMany
    {
        return $this->belongsToMany(Label::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function userFiles(): HasMany
    {
        return $this->hasMany(UserFile::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
