<?php

namespace App\Enums;

enum AppointmentStatusEnum:string
{
    case AVAILABLE = 'available';
    case BOOKED = 'booked';
    case CHECKED = 'checked';
}