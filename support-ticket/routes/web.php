<?php

use App\Enums\TicketStatusEnum;
use App\Enums\UserRoleEnum;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Label;
use App\Models\Ticket;
use App\Models\User;
use App\Models\UserFile;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {

    if(auth()->user()->role !== UserRoleEnum::ADMIN) return redirect("/tickets");

    return Inertia::render('Dashboard',[
        "totalTickets" => Ticket::count(),
        "openTickets" => Ticket::where('status', TicketStatusEnum::OPEN)->count(),
        "closedTickets" => Ticket::where('status', TicketStatusEnum::CLOSED)->count(),
        "totalAgents" => User::where('role', UserRoleEnum::AGENT)->count(),
        "totalNormalUsers" => User::where('role', UserRoleEnum::USER)->count(),
        "totalAdmins" => User::where('role', UserRoleEnum::ADMIN)->count(),
        "totalUsers" => User::count(),
        "totalLabels" => Label::count(),
        "totalCategories" => Category::count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('tickets',TicketController::class);
    Route::get('ticket-logs',[TicketController::class, 'ticketLogs'])->name("ticket-logs");
    Route::put('tickets/{ticket}/close', [TicketController::class, 'closeTicket']);
    Route::resource('categories',CategoryController::class)->only(['index','store','destroy']);
    Route::resource('labels',LabelController::class)->only(['index','store','destroy']);
    Route::resource('users',UserController::class)->except(['show']);
    Route::resource('comments', CommentController::class);

    Route::get('user-file/{userFile}', function (UserFile $userFile){
        return Inertia::render('UserFiles/ShowUserFile',[
            'path' => $userFile->path
        ]);
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
