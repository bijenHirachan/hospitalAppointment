<?php

use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\DoctorController;
use App\Http\Controllers\Admin\PatientController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Doctor\AppointmentController as DoctorAppointmentController;
use App\Http\Controllers\Doctor\PatientController as DocPatientController;
use App\Http\Controllers\Doctor\ScheduleController as DoctorScheduleController;
use App\Http\Controllers\Patient\AppointmentController as PatientAppointmentController;
use App\Http\Controllers\Patient\DepartmentController as PatientDepartmentController;
use App\Http\Controllers\Patient\DoctorController as PatientDoctorController;
use App\Http\Controllers\ProfileController;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\DoctorResource;
use App\Models\Department;
use App\Models\Doctor;
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

// Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);

    // return Inertia::render('Welcome', [
    //     'departments' => Department::all()
    // ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/departments/{department}', function(Department $department){
//     return Inertia::render('Guest/Departments/Show', [
//         'department' => new DepartmentResource($department)
//     ]);
// });

Route::get('/', [PatientDepartmentController::class, 'index']);
Route::resource('/departments', PatientDepartmentController::class)->except('index');

Route::get('/doctors/{doctor}', function (Doctor $doctor){
    return Inertia::render('Patient/Doctors/Index', [
        'doctor' => new DoctorResource($doctor)
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/patients/{appointment}', [PatientAppointmentController::class, 'book']);
});

Route::middleware('auth')->group(function () {
    Route::prefix('admin')->group(function(){

        Route::resource('departments', DepartmentController::class);
        Route::resource('doctors', DoctorController::class);
    
        Route::resource('patients', PatientController::class)->only(['index', 'show']);
        Route::resource('schedules', ScheduleController::class);
        // Route::resource('appointments', AppointmentController::class);
        Route::post('/appointments/{schedule}', [AppointmentController::class, 'store']);
        Route::delete('/appointments/{schedule}/all', [AppointmentController::class, 'destroyAll']);
        Route::delete('/appointments/{appointment}', [AppointmentController::class, 'destroy']);
    });


    Route::prefix('/doctor')->as('doctor.')->group(function(){
        Route::resource('schedules', DoctorScheduleController::class);
        Route::resource('appointments', DoctorAppointmentController::class);
    });

    // Route::prefix('/patient')->as('patient.')->group(function(){
    //     Route::resource('doctors', PatientDoctorController::class);
    // });
});

require __DIR__.'/auth.php';
