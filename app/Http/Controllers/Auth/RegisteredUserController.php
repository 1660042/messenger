<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        // dd($request->avatar->hashName());

        // return 'Error';

        $validator = Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'avatar' => ['required', 'image', 'mimes:jpg,png'],
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => $validator->errors()->first(),
                ],
                200
            );
        }

        if ($request->hasFile('avatar')) {
            $image      = $request->file('avatar');
            $fileName   = time() . '.' . $image->getClientOriginalExtension();

            $result = $request->file('avatar')->storeAs('', $fileName, 'local_images');
        }

        if(!$result) {
            if ($validator->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => "Can't upload avatar, please try again!",
                    ],
                    200
                );
            }
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar_path' => $fileName,
        ]);

        if(!$user) {
            Storage::delete(storage_path('app/public/images/' . $fileName));
        }


        event(new Registered($user));

        Auth::login($user);

        return response()->json(
            [
                'status' => true,
                'message' => 'Register success!',
                'url' => route('users.index'),
            ],
            200
        );

        // return redirect(RouteServiceProvider::HOME);
    }
}
