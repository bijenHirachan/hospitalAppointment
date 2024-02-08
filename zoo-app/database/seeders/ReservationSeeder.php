<?php

namespace Database\Seeders;

use App\Models\Day;
use App\Models\Reservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
        foreach(range(1,30) as $number){
          foreach(range(2,5) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
          foreach(range(2,10) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
          foreach(range(3,25) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
          foreach(range(2,30) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
          foreach(range(8,14) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
          foreach(range(15,28) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
   
        }


        foreach(range(1,200) as $number){
          Reservation::create([
            'day_id' => 1,
            'schedule_id' => 1,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'subscription_number' => null
        ]);
        }
    }
}
