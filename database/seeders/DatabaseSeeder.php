<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        \App\Models\Department::create([
            'name' => 'Orthopaedic',
            'description' => fake()->sentence()
        ]);
        \App\Models\Department::create([
            'name' => 'Cardiology',
            'description' => fake()->sentence()
        ]);
        \App\Models\Department::create([
            'name' => 'Pediatrics',
            'description' => fake()->sentence()
        ]);
        \App\Models\Department::create([
            'name' => 'Gynaecology',
            'description' => fake()->sentence()
        ]);
    }
}
