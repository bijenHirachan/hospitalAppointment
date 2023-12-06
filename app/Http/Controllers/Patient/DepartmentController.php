<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Patient/Departments/Index', [
            'departments' => DepartmentResource::collection(Department::all())
        ]);
    }

    public function show(Department $department)
    {
        return Inertia::render('Patient/Departments/Show', [
            'department' => new DepartmentResource($department)
        ]);
    }
}
