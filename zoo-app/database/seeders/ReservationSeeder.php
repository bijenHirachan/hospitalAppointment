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
          foreach(range(5,15) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
          foreach(range(4,12) as $item){
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
          foreach(range(3,29) as $item){
            $day = Day::find($item);

            Reservation::create([
                'day_id' => $day->id,
                'schedule_id' => fake()->randomElement($day->schedules->pluck('id')->toArray()),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'subscription_number' => null
            ]);
          }
          foreach(range(8,18) as $item){
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
          Reservation::create([
            'day_id' => 1,
            'schedule_id' => 2,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'subscription_number' => null
        ]);
          Reservation::create([
            'day_id' => 2,
            'schedule_id' => 18,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'subscription_number' => null
        ]);
          Reservation::create([
            'day_id' => 30,
            'schedule_id' => 266,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'subscription_number' => null
        ]);
        }
    }
}
