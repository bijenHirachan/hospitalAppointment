<?php

namespace Database\Seeders;

use App\Enums\SectionEnum;
use App\Models\Standard;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StandardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
        $standards = [
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
        ];

        foreach($standards as $standard){
            Standard::create([
                "title" => $standard,
                "section" => SectionEnum::A,
            ]);
            Standard::create([
                "title" => $standard,
                "section" => SectionEnum::B,
            ]);
        }
    }
}
