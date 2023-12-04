<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Patient::class);
    }

    public function index()
    {
        return Inertia::render('Admin/Patients/Index', [
            'patients' => Patient::with('user')->get()
        ]);
    }

    public function show(Patient $patient)
    {
        return Inertia::render('Admin/Patients/Show', [
            'patient' => $patient->load('user')
        ]);
    }
}
