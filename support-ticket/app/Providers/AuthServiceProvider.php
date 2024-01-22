<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Enums\UserRoleEnum;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('update-status', function (User $user, Ticket $ticket) {
            return $user->role === UserRoleEnum::ADMIN || ($user->role === UserRoleEnum::AGENT && $ticket->assignedTo->id === $user->id);
        });
    }
}
