<?php

namespace App\Http\Controllers\Patient;

use App\Enums\AppointmentStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function book(Appointment $appointment)
    {
        $appointment->update([
            'status' => AppointmentStatusEnum::BOOKED,
            'patient_id' => auth()->user()->patient->id
        ]);
    }
}
