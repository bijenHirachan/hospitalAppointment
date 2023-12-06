<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Department::class, 'department');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Departments/Index', [
            'departments' => Department::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Departments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        $validated = $request->validated();

        if($validated['image']){
            $image = $validated['image'];
            $fileName = pathinfo($image->getClientOriginalName())['filename'];
            $path = $image->storeAs('department_images', $fileName . time() .".". $request->file('image')->getClientOriginalExtension(), 'public');
        }

        Department::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'image_url' => $path ?? NULL,
        ]);

        return to_route('departments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return Inertia::render('Admin/Departments/Show', [
            'department' => $department
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        return Inertia::render('Admin/Departments/Edit', [
            'department' => $department
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $validated = $request->validated();

        if($validated['image']){
            $image = $validated['image'];
            $fileName = pathinfo($image->getClientOriginalName())['filename'];
            $path = $image->storeAs('department_images', $fileName . time() .".". $request->file('image')->getClientOriginalExtension(), 'public');
        }

        $department->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'image_url' => $path ?? $department->image_url,
        ]);

        return to_route('departments.show', $department->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
    }
}
