<?php

namespace App\Models;

use App\Enums\SectionEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Standard extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'section',
        'user_id'
    ];

    protected $casts = [
        'section' => SectionEnum::class
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class);
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}
