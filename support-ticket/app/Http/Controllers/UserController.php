<?php

namespace App\Http\Controllers;

use App\Enums\UserRoleEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }
    
    public function index(Request $request)
    {
        return Inertia::render('Users/UsersIndex', [
                'users' => User::when($request->query('search'), function(Builder $query) use($request){
                                return $query->where('name', 'LIKE', '%'.$request->query('search').'%')
                                ->orWhere('email', 'LIKE', '%'.$request->query('search').'%');
                            })
                            ->when($request->query('role'), function (Builder $query) use($request){
                                return $query->where('role', $request->query('role')) ;
                            })        
                            ->paginate(5)
                            ->withQueryString(),
                'roles' => UserRoleEnum::cases(),
                'searchQuery' => $request->query('search'),
                'roleQuery' => $request->query('role')
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/CreateUser', [
            "roles" => UserRoleEnum::cases()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'role' => 'required',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make("password")
        ]);  

        return to_route('users.index');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/EditUser', [
            'user' => $user,
            "roles" => UserRoleEnum::cases()
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,'.$user->id,
            'role' => 'required'
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role']
        ]);

        return to_route('users.index');
    }

    public function destroy(User $user)
    {
        dd($user);
        // $user->delete();
    }
}
