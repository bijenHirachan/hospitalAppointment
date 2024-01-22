<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Ticket;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Comment::class);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'comment' => 'required',
            'ticket' => 'required'
        ]);
        
        $ticket = Ticket::find($validated['ticket']);

        auth()->user()->comments()->create([
            'body' => $validated['comment'],
            'ticket_id' => $ticket->id,
        ]);

        activity()
            ->causedBy(auth()->user())
            ->performedOn($ticket)
            ->log(auth()->user()->name. ' has commented on a ticket titled: '. $ticket->title .'.');
    }

    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'body' => "required"
        ]);

        $comment->update([
            'body' => $validated['body']
        ]);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
