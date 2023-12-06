<?php

namespace App\Http\Controllers\Doctor;

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        if(auth()->user()->role === UserRoleEnum::DOCTOR){
            return Inertia::render('Doctor/Schedules/Index', [
                'schedules' => auth()->user()->doctor->schedules
            ]);
        }

        abort(401);
    }

    public function show(Schedule $schedule)
    {
        if(auth()->user()->role === UserRoleEnum::DOCTOR){
            return Inertia::render('Doctor/Schedules/Show', [
                'schedule' => new ScheduleResource($schedule)
            ]);
        }

        abort(401);
    }
}
