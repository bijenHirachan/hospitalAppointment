<?php

namespace App\Http\Controllers\Doctor;

use App\Enums\AppointmentStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function show(Appointment $appointment)
    {
        return Inertia::render('Doctor/Appointments/Edit',[
            'appointment' => new AppointmentResource($appointment),
            'schedule' => $appointment->schedule
        ]);
    }

    public function update(Appointment $appointment, Request $request)
    {
        $validated = $request->validate([
            'status' => ["required", new Enum(AppointmentStatusEnum::class)],
            'remarks' => 'nullable'
        ]);

        $appointment->update([
            'status' => $validated['status'],
            'remarks' => $validated['remarks']
        ]);
    }
}
