<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
    }

    public function store(Schedule $schedule, Request $request)
    {
        $startTime = $schedule->start_time;
        $endTime = $schedule->end_time;

        $arr = array();

        while(new Carbon($startTime) < new Carbon($endTime))
        {
            $newTime = date("G:i", (new Carbon($startTime))->addMinutes((int)$request->duration)->getTimestamp());
            
            array_push($arr, ['schedule_id' => $schedule->id, 'status' => "available", 'time_slot' => date("G:i", (new Carbon($startTime))->getTimestamp()). ' - ' . $newTime]);

            $startTime = date("G:i", (new Carbon($startTime))->addMinutes((int)$request->duration)->getTimestamp());
        }
        DB::table('appointments')->insert($arr);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
    }

    public function destroyAll(Schedule $schedule)
    {
        $schedule->appointments()->delete();
    }
}
