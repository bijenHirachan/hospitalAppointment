<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'shift',
        'day',
        'start_time',
        'end_time',
        'doctor_id'
    ];


    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}
