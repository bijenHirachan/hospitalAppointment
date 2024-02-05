<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use function PHPUnit\Framework\isInstanceOf;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $projects = parent::toArray($request);

        $projects['tasks'] = TaskResource::collection($this->whenLoaded("tasks", function(){
            return $this->tasks->sortByDesc("created_at");
        }));
        $projects['members'] = UserResource::collection($this->whenLoaded("members"));

        return $projects;
    }
}
