<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Category;
use App\Models\Label;
use Inertia\Inertia;
use App\Enums\PriorityEnum;
use App\Enums\TicketStatusEnum;
use App\Enums\UserRoleEnum;
use App\Mail\TicketReceived;
use App\Models\Comment;
use App\Models\User;
use App\Models\UserFile;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Spatie\Activitylog\Models\Activity;

class TicketController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Ticket::class);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tickets = Ticket::with('categories','assignedTo', 'user')
                    ->when($request->query('status') !== "" && $request->query('status') !== null, function (Builder $query) use($request){
                        return $query->where('status', $request->query('status'));
                    })
                    ->when($request->query('priority') !== "" && $request->query('priority') !== null, function (Builder $query) use($request){
                        return $query->where('priority', $request->query('priority'));
                    })
                    ->when($request->query('category') !== "" && $request->query('category') !== null, function (Builder $query) use($request){
                        return $query->whereRelation('categories', 'category_id', $request->query('category'));
                    })
                    ->when(auth()->user()->role === UserRoleEnum::AGENT, function(Builder $query){
                        $query->where('assigned_to', auth()->user()->id);
                    })
                    ->when(auth()->user()->role === UserRoleEnum::USER, function (Builder $query) {
                        $query->where('user_id', auth()->user()->id);
                    })
                    ->latest()
                    ->paginate(8)
                    ->withQueryString() ;
  

        return Inertia::render('Tickets/TicketsIndex', [
            'tickets' => $tickets,
            'categories' => Category::all(),
            'priorities' => PriorityEnum::cases(),
            'statuses' => TicketStatusEnum::cases(),
            'statusQuery' => $request->query('status'),
            'priorityQuery' => $request->query('priority'),
            'categoryQuery' => $request->query('category'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tickets/CreateTicket', [
            'labels' => Label::all(),
            'categories' => Category::all(),
            'priorities' => PriorityEnum::cases()
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $validated = $request->validated();

        $ticket = Ticket::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => TicketStatusEnum::OPEN,
            'priority' => $validated['priority'],
            'user_id' => auth()->user()->id
        ]);

       if($validated['userFiles']){
        foreach($validated['userFiles'] as $file){
            $filename = $file->getClientOriginalName();

            $path = $file->storeAs('user-files', time().'-'.$filename, 'public');

            UserFile::create([
                'path' => $path,
                'ticket_id' => $ticket->id
            ]);
        }
       }

        foreach(Label::all() as $key=>$label)
        {
          if($validated['labels'][$key]){
            $ticket->labels()->attach($label->id);
          }
        }

        foreach(Category::all() as $key=>$category)
        {
          if($validated['categories'][$key]){
            $ticket->categories()->attach($category->id);
          }
        }

        Mail::to('admin@admin.com')->queue(new TicketReceived($ticket));

        activity()
            ->causedBy(auth()->user())
            ->performedOn($ticket)
            ->log("Ticket Created");

        return to_route('tickets.show', $ticket->id);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        return Inertia::render('Tickets/TicketDetail', [
            'ticket' => $ticket->load('categories', 'labels', 'user', 'assignedTo', 'userFiles', 'comments.user'),
            'agents' => User::where('role', UserRoleEnum::AGENT)->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $agent = User::find($request->agent);

        $ticket->update([
            'assigned_to' => $agent->id
        ]);

        Mail::to($agent->email)->queue(new TicketReceived($ticket));

        activity()
            ->performedOn($ticket)
            ->log("Ticket Assigned");
    }


    public function closeTicket(Ticket $ticket)
    {
        if (! Gate::allows('update-status', $ticket)){
            abort(403);
        }
        
        $ticket->update([
            'status' => $ticket->status === TicketStatusEnum::CLOSED ? TicketStatusEnum::OPEN : TicketStatusEnum::CLOSED
        ]);

        $status = $ticket->status === TicketStatusEnum::CLOSED ? "closed." : "reopened.";

        activity()
            ->causedBy(auth()->user())
            ->performedOn($ticket)
            ->log("Ticket ". $status );

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }

  

    public function ticketLogs(Request $request)
    {
        return Inertia::render('Tickets/TicketLogs', [
            'logs' => Activity::with('causer', 'subject')
                        ->where('description', 'LIKE', '%'.$request->query('search').'%')
                        ->when($request->query('user') !== "" && $request->query('user') !== null, function (Builder $query) use($request){
                            return $query->whereRelation('causer',  'name', 'like', '%'.$request->query('user').'%');
                        })
                        ->when($request->query('ticket') !== "" && $request->query('ticket') !== null, function (Builder $query) use($request){
                            return $query->whereRelation('subject', 'title', 'like', '%'.$request->query('ticket').'%');
                        })
                        ->latest()
                        ->paginate(5)
                        ->withQueryString(),
            'searchQuery' => $request->query('search'),
            'searchUserQuery' => $request->query('user'),
            'searchTicketQuery' => $request->query('ticket'),
        ]);
    }
}
