<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkinghourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
 
        \App\Models\Workinghour::create([
            'time' => '8:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '9:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '10:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '11:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '12:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '14:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '15:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '16:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '17:00',
            'shift' => 'day',
        ]);
        \App\Models\Workinghour::create([
            'time' => '19:00',
            'shift' => 'night',
        ]);
        \App\Models\Workinghour::create([
            'time' => '20:00',
            'shift' => 'night',
        ]);
        \App\Models\Workinghour::create([
            'time' => '21:00',
            'shift' => 'night',
        ]);
        \App\Models\Workinghour::create([
            'time' => '22:00',
            'shift' => 'night',
        ]);
    }
}
