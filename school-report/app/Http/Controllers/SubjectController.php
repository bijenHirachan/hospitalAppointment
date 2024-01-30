<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;

class SubjectController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Subject::class);
    }
   
    public function store(StoreSubjectRequest $request)
    {
        Subject::create([
            "title" => $request->title,
            "standard_id" => $request->standard_id
        ]);
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();
    }
}
