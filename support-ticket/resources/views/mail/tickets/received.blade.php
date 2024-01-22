<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{$ticket->title}</title>
</head>

<body>
    You have recived a ticket.

    <div>Title: {{ $ticket->title }}</div>
    <div>Priority: {{ $ticket->priority }}</div>
    <div>Description: {{ $ticket->description }}</div>

    <a target="_blank" href="{{ config('app.url') }}:8000/tickets/{{ $ticket->id }}">Link</a>

</body>

</html>
