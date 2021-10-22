@extends('layouts.default')
@section('content')
    <section class="users">
        <header>
            <div class="content">
                <img src="{{ asset('storage/images/' . auth()->user()->avatar_path) }}" alt="">
                <div class="details">
                    <span>{{ auth()->user()->first_name . ' ' . auth()->user()->last_name }}</span>
                    <p>{{ Config('constant.status')[auth()->user()->status]['text'] }}</p>
                </div>
            </div>
            <a href="{{ route('logout') }}" class="logout">Logout</a>
        </header>
        <div class="search">
            <span class="text">Select an user to start chat</span>
            <input type="text" name="" placeholder="Enter name or phone number to search...">
            <button><i class="fas fa-search"></i></button>
        </div>
        <div class="users-list">
            {{-- <a href="#">
                <div class="content">
                    <img src="storage/images/default-avatar.png" alt="">
                    <div class="details">
                        <span>Coding Yoshin</span>
                        <p>This is test messenger</p>
                    </div>
                </div>
                <div class="status-dot"><i class="fas fa-circle"></i></div>
            </a> --}}
        </div>
    </section>
@endsection
@section('js')
    <script src="{{ asset('js/users.js') }}"></script>
@endsection
