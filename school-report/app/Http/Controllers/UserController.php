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

    public function index()
    {
        return Inertia::render("Teachers/TeachersIndex", [
            "teachers" => User::with("standard")->get()
        ]);
    }

    public function create()
    {
        return Inertia::render("Teachers/CreateTeacher",[
            "standards" => Standard::where("user_id", NULL)->get()
        ]);
    }

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

    public function edit(User $teacher)
    {
        return Inertia::render("Teachers/EditTeacher",[
            "teacher" => $teacher->load("standard"),
            "standards" => Standard::where("user_id", NULL)->get()
        ]);
    }

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

    public function destroy(User $teacher)
    {

        DB::transaction(function () use($teacher){
            $teacher->standard->update([
                'user_id' => NULL
            ]);
    
            $teacher->delete();
        });
       

        return to_route("teachers.index");
    }

}
