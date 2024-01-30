<?php

namespace App\Http\Controllers;

use App\Models\Standard;
use App\Http\Requests\StoreStandardRequest;
use App\Http\Requests\UpdateStandardRequest;
use Inertia\Inertia;

class StandardController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Standard::class);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(auth()->user()->is_admin){
            return Inertia::render("Standards/StandardsIndex", [
                "standards" => Standard::with("students", "subjects", "user")->get()
            ]);
        }
     
        return to_route("standards.show", auth()->user()->standard?->id);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStandardRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Standard $standard)
    {
        return Inertia::render("Standards/StandardDetails", [
            'standard' => $standard->load("students", "subjects")
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Standard $standard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStandardRequest $request, Standard $standard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Standard $standard)
    {
        //
    }
}
