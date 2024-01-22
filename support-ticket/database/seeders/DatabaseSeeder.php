<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\UserRoleEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'role' => UserRoleEnum::ADMIN,
            'password' => Hash::make('password')
        ]);

        \App\Models\Label::create([
            'name' => 'Bug'
        ]);
        \App\Models\Label::create([
            'name' => 'Question'
        ]);
        \App\Models\Label::create([
            'name' => 'Enhancement'
        ]);

        \App\Models\Category::create([
            'name' => 'Uncategorized'
        ]);
        \App\Models\Category::create([
            'name' => 'Billing/Payments'
        ]);
        \App\Models\Category::create([
            'name' => 'Technical question'
        ]);
    }
}
