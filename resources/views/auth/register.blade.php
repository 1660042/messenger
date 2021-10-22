@extends('layouts.default')
@section('content')
    <section class="form register">
        <header>Realtime Chat App</header>
        <form action="{{ route('register') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="error-txt">This is an error messenger!</div>
            <div class="name-details">
                <div class="field input">
                    <label>First name</label>
                    <input type="text" name="first_name" placeholder="First name">
                </div>
                <div class="field input">
                    <label>Last name</label>
                    <input type="text" name="last_name" placeholder="Last name">
                </div>
            </div>
            <div class="field input">
                <label>Email address</label>
                <input type="email" name="email" placeholder="Enter your email">
            </div>
            <div class="field input">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter new password">
                <i class="fas fa-eye"></i>
            </div>
            <div class="field image">
                <label>Select image</label>
                <input type="file" name="avatar">
            </div>
            <div class="field button">
                <input type="submit" value="Continue to Chat">
            </div>
        </form>
        <div class="link">Already signed up? <a href="{{ route('login') }}">Login now</a></div>
    </section>
@endsection
@section('js')
<script src="{{ asset('js/password-show-hide.js') }}"></script>
<script src="{{ asset('js/register.js') }}"></script>
@endsection
