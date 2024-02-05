<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Project::class, 'project');    
    }

    public function index(Request $request)
    {
        $projects = QueryBuilder::for(Project::class)
            ->allowedFilters("title")
            ->allowedIncludes('tasks')
            ->defaultSort("-created_at")
            ->paginate($request->items ?? 5);

        return ProjectResource::collection($projects);
    }

    public function show(Project $project)
    {
        return new ProjectResource($project->load('tasks', 'members'));
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        $project = Auth::user()->projects()->create($validated);

        return new ProjectResource($project);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update($validated);

        return new ProjectResource($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->noContent();
    }

    public function addMember(Project $project, User $user)
    {
        if($project->members()->pluck('id')->contains($user->id)){
            throw new \Exception("Member already added!");
        }

        $project->members()->attach([$user->id]);

        return response()->json([
            "message" =>  "Member added"
        ]);
    }
}
