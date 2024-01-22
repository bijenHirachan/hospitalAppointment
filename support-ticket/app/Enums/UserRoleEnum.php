<?php

namespace App\Enums;

enum UserRoleEnum: string
{
    case ADMIN = 'admin';
    case AGENT = 'agent';
    case USER = 'user';
}