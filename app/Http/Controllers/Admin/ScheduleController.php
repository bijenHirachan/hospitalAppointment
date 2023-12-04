<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ScheduleResource;
use App\Models\Doctor;
use App\Models\Schedule;
use App\Models\Workinghour;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ScheduleController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Schedule::class);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Schedules/Index', [
            'schedules' => ScheduleResource::collection(Schedule::orderBy('day')->get()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $days = [
            now()->addDays(1),
            now()->addDays(2),
            now()->addDays(3),
            now()->addDays(4),
            now()->addDays(5),
            now()->addDays(6),
            now()->addDays(7)
        ];

        return Inertia::render('Admin/Schedules/Create',[
            'workinghours' => Workinghour::all(),
            'days' => collect($days),
            'doctors' => Doctor::with('user')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shift' => 'required',
            'day' => "required",
            'startTime' => "required",
            'endTime' => "required",
            "doctor" => "required"
        ]);

        $schedule = DB::table('schedules')
                        ->where('doctor_id', $validated['doctor'])
                        ->whereDate('day', new DateTime($validated['day']))
                        ->where('shift', $validated['shift'])
                        ->first();

        if(!$schedule){
            Schedule::create([
                'shift' => $validated['shift'],
                'day' => $validated['day'],
                'start_time' => $validated['startTime'],
                'end_time' => $validated['endTime'],
                'doctor_id' => $validated["doctor"]
            ]);

            return to_route('schedules.index');

        }else{
            session()->flash('message', 'Schedule already exists');
        }        
        
   
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
