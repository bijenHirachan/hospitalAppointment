<?php

namespace Database\Seeders;

use App\Models\Standard;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            "Math", "Science", "English", "Social Science", "General Knowledge"
        ];

        foreach(Standard::all() as $standard){
            foreach($subjects as $subject){
                Subject::create([
                    "title" => $subject,
                    "standard_id" => $standard->id
                ]);
            }
        }
    }
}
