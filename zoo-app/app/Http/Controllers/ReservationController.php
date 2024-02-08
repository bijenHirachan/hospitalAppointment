<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function store(StoreReservationRequest $request)
    {
        $validated = $request->validated();

        $data = [];

        array_push($data, [ 
            "day_id" => $validated["day"],
            "schedule_id" => $validated["timeslot"],
            "first_name" => $validated["first_name1"], 
            "last_name" => $validated["last_name1"],
            "subscription_number" => $validated["subscription_number1"]
        ]);

        if($validated['first_name2'] !== "" && $validated["first_name2"] !== null){
            array_push($data, [ 
                "day_id" => $validated["day"],
                "schedule_id" => $validated["timeslot"],
                "first_name" => $validated["first_name2"], 
                "last_name" => $validated["last_name2"],
                "subscription_number" => $validated["subscription_number2"]
            ]);
        }

        if($validated['first_name3'] !== "" && $validated["first_name3"] !== null){
            array_push($data, [ 
                "day_id" => $validated["day"],
                "schedule_id" => $validated["timeslot"],
                "first_name" => $validated["first_name3"], 
                "last_name" => $validated["last_name3"],
                "subscription_number" => $validated["subscription_number3"]
            ]);
        }

        $d = DB::table("reservations")->insert($data);

        return Inertia::render("Success", [
            "data" => $data[0]
        ]);
    }
}
