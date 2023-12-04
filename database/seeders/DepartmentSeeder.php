<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Department::create([
            'name' => 'Orthopaedic',
            'description' => fake()->sentence(),
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
