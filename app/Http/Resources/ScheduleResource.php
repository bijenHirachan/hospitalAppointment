<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'day' => $this->day,
            'shift' => $this->shift,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'doctor' => $this->doctor->user->name,
            'doctor_id' => $this->doctor->id
        ];
    }
}
