<?php

namespace App\Http\Controllers;

use App\Models\Standard;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(User::class, "teacher");
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Teachers/TeachersIndex", [
            "teachers" => User::with("standard")->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Teachers/CreateTeacher",[
            "standards" => Standard::where("user_id", NULL)->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users,email",
            "standard" => "nullable"
        ]);

        DB::transaction(function() use($validated){
            $user = User::create([
                "name" => $validated["name"],
                "email" => $validated["email"],
                "password" => Hash::make("password")
            ]);

            if(isset($validated["standard"]) && $validated["standard"] !== ""){
                $standard = Standard::find($validated["standard"]);

                $standard->update([
                    "user_id" => $user->id
                ]);
            }
           
        });

        return to_route("teachers.index");
       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $teacher)
    {
        return Inertia::render("Teachers/EditTeacher",[
            "teacher" => $teacher->load("standard"),
            "standards" => Standard::where("user_id", NULL)->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $teacher)
    {
        $validated = $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users,email, $teacher->id",
            "changeStandard" => "required",
            "standard" => "nullable",
        ]);

        if($validated["changeStandard"]){
            
           DB::transaction(function() use($teacher, $validated){

            $oldStandard = Standard::where("user_id", $teacher->id)->first();

            if($oldStandard){
                $oldStandard->user()->dissociate();
                $oldStandard->save();
            }

            $newStandard = Standard::find($validated["standard"]);

            $newStandard->user()->associate($teacher);

            $newStandard->save();
           });
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
