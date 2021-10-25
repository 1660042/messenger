<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers;
use App\Models\Message;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $user = null;
    private $data = null;
    private $message = null;

    public function __construct(User $user, Message $message)
    {
        $this->user = $user;
        $this->message = $message;
    }

    public function index()
    {
        return view('users');
    }

    public function search(Request $request)
    {
        if ($request->has('keyword')) {
            $this->data = $this->user
                ->where('id', '!=', auth()->id())
                ->where(function ($query) use ($request) {
                    $query->where('first_name', 'like', '%' . $request->keyword . '%')
                        ->orWhere('last_name', 'like', '%' . $request->keyword . '%');
                })->get();


            if ($this->data->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'No user found related to your search keyword!',
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => $this->data->count() . ' results found!',
                'users' => $this->data
            ]);
        } else {
            $this->data = $this->user->with('getMessageReceiver', 'getMessageSender')->where('id', '!=', auth()->id())->get();

            // dd($this->data);
            if ($this->data->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => "You don't have any message!",
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => $this->data->count() . ' results found!!!',
                'users' => $this->data
            ]);
        }
    }


    public function chat($id)
    {

        $this->data = $this->user->find($id);

        if ($this->data == null) {
            return abort(404);
        }

        return view('chat', ['data' => $this->data]);
    }

    public function sendChat(Request $request, $id)
    {

        // dd($request->all());

        $incoming = $this->user->find($id);
        if ($incoming) {
            if ($request->has('message') && strlen(trim($request->message)) > 0) {
                $result = $this->message->create([
                    'incoming_id' => $incoming->id,
                    'outgoing_id' => auth()->id(),
                    'message' => $request->message,
                ]);

                if ($result) {
                    return response()->json([
                        'status' => true,
                        'message' => "Send message success!",
                    ]);
                }

                return response()->json([
                    'status' => false,
                    'message' => "Send message failed!",
                ]);
            }
        }
    }

    public function getChat(Request $request, $id)
    {
        $user = $this->user->find($id);
        if ($user) {
            $this->data = $this->message
                ->where(function ($query) use ($user) {
                    $query->where('outgoing_id', '=', $user->id)
                        ->Where('incoming_id', '=', auth()->id());
                })->orWhere(function ($query) use ($user) {
                    $query->where('outgoing_id', '=', auth()->id())
                        ->Where('incoming_id', '=', $user->id);
                })->orderBy('id')->get();

            if(!$this->data->isEmpty()) {
                return response()->json([
                    'status' => true,
                    'data' => $this->data,
                    'user' => $user,
                ]);
            }

            return response()->json([
                'status' => false,
                'data' => null,
                'user' => $user,
            ]);
        }
    }
}
