<?php

namespace App\Http\Controllers\Doctor;

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        if(auth()->user()->role === UserRoleEnum::DOCTOR){
            return Inertia::render('Doctor/Patients/Index', [
                'patients' => Patient::all()
            ]);
        }

        abort(404);
    }
}
