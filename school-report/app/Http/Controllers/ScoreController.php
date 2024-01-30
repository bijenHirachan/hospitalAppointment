<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Http\Requests\StoreScoreRequest;

class ScoreController extends Controller
{
    public function store(StoreScoreRequest $request)
    {
        foreach($request->marks as $mark){
            $score = Score::where("student_id", $request->student)->where("subject_id", $mark["subjectId"])->first();

            if($score){
                $score->update([
                    "marks" => $mark["score"]
                ]);
            }else{
                Score::create([
                    "marks" => $mark["score"],
                    "student_id" => $request->student,
                    "subject_id" => $mark["subjectId"]
                ]);
            }
        }
    }

}
