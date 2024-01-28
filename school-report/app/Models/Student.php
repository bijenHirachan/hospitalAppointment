<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "dob",
        "standard_id"
    ];

    public function standard(): BelongsTo
    {
        return $this->belongsTo(Standard::class);
    }

    public function scores(): HasMany
    {
        return $this->hasMany(Score::class);
    }
}
