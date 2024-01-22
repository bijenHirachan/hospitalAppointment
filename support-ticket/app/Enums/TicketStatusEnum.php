<?php

namespace App\Enums;

enum TicketStatusEnum: string
{
    case OPEN = 'open';
    case CLOSED = 'closed';
}