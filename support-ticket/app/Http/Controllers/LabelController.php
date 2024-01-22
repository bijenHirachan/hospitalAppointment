<?php

namespace App\Http\Controllers;

use App\Models\Label;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabelController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Label::class);
    }

    public function index(Request $request)
    {
        return Inertia::render('Labels/LabelsIndex', [
            'labels' => Label::where('name', 'LIKE', '%'.$request->query('search').'%')->paginate(8)->withQueryString(),
            'searchQuery' => $request->query('search')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['label' => 'required']);

        Label::create([
            'name' => $validated['label']
        ]);
    }

    public function destroy(Label $label)
    {
        $label->delete();
    }
}
