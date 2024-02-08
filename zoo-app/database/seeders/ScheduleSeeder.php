<?php

namespace Database\Seeders;

use App\Models\Day;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(range(1,30) as $number){
            $date = Day::create([
                'day' => now()->addDays($number)->format("Y-m-d")
            ]);
    
            foreach(Carbon::parse("$date->day 9am")->toPeriod("$date->day 5pm", 60, 'minutes') as $period){
                Schedule::create([
                    "day_id" => $date->id,
                    "start_time" => $period->format('h:i A'),
                    "end_time" => $period->addHour()->format('h:i A')
                ]);
            }
        }

        
    }
}
