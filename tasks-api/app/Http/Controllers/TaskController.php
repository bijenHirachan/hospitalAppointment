<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Task::class, 'task');
    }
    
    public function index(Request $request)
    {
        $tasks = QueryBuilder::for(Task::class)
                    ->allowedFilters("title", "is_done")
                    ->allowedIncludes('project')
                    ->defaultSort("-created_at")
                    ->allowedSorts("title","is_done","created_at")
                    ->paginate($request->items ?? 5);

        return  TaskResource::collection($tasks);
    }

    public function show(Request $request, Task $task)
    {
        return  new TaskResource($task);
    }

    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();

        $task = Auth::user()->tasks()->create($validated);

        return  new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $validated = $request->validated();

        $task->update($validated);

        return  new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}
