<?php

namespace App\Http\Controllers;

use App\Models\Standard;
use App\Http\Requests\UpdateStandardRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandardController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Standard::class);
    }

    public function index(Request $request)
    {
        if(auth()->user()->is_admin){
            return Inertia::render("Standards/StandardsIndex", [
                "standards" => Standard::with("students", "subjects", "user")
                                ->where('title', 'LIKE', "%". $request->query("search"). "%")
                                ->get(),
                "searchString" => $request->query("search")

            ]);
        }
     
        return to_route("standards.show", auth()->user()->standard?->id);
    }


    public function show(Standard $standard)
    {
        return Inertia::render("Standards/StandardDetails", [
            'standard' => $standard->load("students", "subjects")
        ]);
    }

}
