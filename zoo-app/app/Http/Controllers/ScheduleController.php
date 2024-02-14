<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function show(Schedule $schedule, Request $request)
    {
        return Inertia::render("Schedules/Reservations", [
            "schedule" => $schedule->load("day"),
            "reservations" =>  $schedule->reservations()->when($request->query("search"), function($query) use($request){
                                    $query->where("first_name", "LIKE", "%".$request->query("search")."%")
                                        ->orWhere("last_name", "LIKE", "%".$request->query("search")."%");
                                    })
                                ->paginate(5)
                                ->withQueryString(),
            "searchString" => $request->query("search")
        ]);
    }
}
