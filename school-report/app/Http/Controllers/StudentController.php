<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use Inertia\Inertia;
use PDF;

class StudentController extends Controller
{
    public function store(StoreStudentRequest $request)
    {
        Student::create([
            "name" => $request->name,
            "dob" => $request->dob,
            "standard_id" => $request->standard_id,
        ]);
    }

    public function show(Student $student)
    {
        return Inertia::render("Students/StudentDetail", [
            "student" => $student->load("standard.subjects", "scores.subject")
        ]);
    }

    public function destroy(Student $student)
    {
        $student->delete();
    }

    public function viewPdf(Student $student)
    {
        $total = 0;
        $status = "PASS";

        foreach($student->scores as $score)
        {
            $total += $score->marks;
            if($score->marks < 32){
                $status = "FAIL";
            }
        }

        $grandTotal = $student->standard->subjects->count() * 100;

        $pdf = PDF::setOption(["chroot" => "/public"])
                ->loadView("pdf", [
                    "student" => $student->load("standard","scores.subject"),
                    "total" => $total,
                    "teacher" => $student->standard?->user?->name,
                    "grandTotal" => $grandTotal,
                    "status" => $status,
                    "percentage" => number_format(($total * 100)/$grandTotal, 2)
                ]);
        return $pdf->stream();
    }

}
