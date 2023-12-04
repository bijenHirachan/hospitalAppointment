<?php

use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\DoctorController;
use App\Http\Controllers\Admin\PatientController;
use App\Http\Controllers\Admin\ScheduleController;

use App\Http\Controllers\Doctor\PatientController as DocPatientController;

use App\Http\Controllers\ProfileController;
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
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::prefix('admin')->group(function(){

    
        Route::resource('departments', DepartmentController::class);
        Route::resource('doctors', DoctorController::class);
    
        Route::resource('patients', PatientController::class)->only(['index', 'show']);
        Route::resource('schedules', ScheduleController::class);
    });


    Route::prefix('/doctor')->as('doctor.')->group(function(){
        Route::resource('patients', DocPatientController::class);
    });
});

require __DIR__.'/auth.php';
