<?php

namespace App\Enums;

enum UserRoleEnum:string
{
    case ADMIN = 'admin';
    case DOCTOR = 'doctor';
    case PATIENT = 'patient';
}