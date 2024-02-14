<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function store(StoreReservationRequest $request)
    {
        $validated = $request->validated();

        $data = [];

        $schedule = Schedule::findOrFail($validated["timeslot"]);

        foreach($validated["users"] as $user){
            array_push($data, [
                "day_id" => $schedule->day_id,
                "schedule_id" => $schedule->id,
                "first_name" => $user["first_name"],
                "last_name" => $user["last_name"],
                "subscription_number" => $user["subscription_number"]
            ]);
        }

        DB::table("reservations")->insert($data);

        return Inertia::render("Success", [
            "data" => $data
        ]);
    }
}
