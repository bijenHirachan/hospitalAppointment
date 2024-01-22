<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Category::class);
    }
    
    public function index(Request $request)
    {
        return Inertia::render('Categories/CategoriesIndex', [
            'categories' => Category::where('name', 'LIKE', '%'.$request->query('search').'%')->paginate(8)->withQueryString(),
            'searchQuery' => $request->query('search')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['category' => 'required']);

        Category::create([
            'name' => $validated['category']
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
    }
}
