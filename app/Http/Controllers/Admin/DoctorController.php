<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDoctorRequest;
use App\Models\Department;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DoctorController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Doctor::class, 'doctor');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Doctors/Index',[
            'doctors' => Doctor::with('department', 'user')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Doctors/Create', [
            'departments' => Department::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorRequest $request)
    {
        $validated = $request->validated();

        if($validated['avatar']){
            $image = $validated['avatar'];
            $fileName = pathinfo($image->getClientOriginalName())['filename'];
            $path = $image->storeAs('doctor_images', $fileName . time() .".". $request->file('avatar')->getClientOriginalExtension(), 'public');
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => UserRoleEnum::DOCTOR,
            'password' => Hash::make('password')
        ]);

        Doctor::create([
            'qualification' => $validated['qualification'],
            'department_id' => $validated['department'],
            'image_url' => $path ?? NULL,
            'user_id' => $user->id
        ]);

        return to_route('doctors.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        return Inertia::render('Admin/Doctors/Show', [
            'doctor' => $doctor->load('department','user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
