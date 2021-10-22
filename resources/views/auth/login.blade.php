@extends('layouts.default')
@section('content')
<section class="form login">
    <header>Realtime Chat App</header>
    <form action="{{ route('login') }}" method="POST">
        @csrf
        @if ($errors->any())
        <div class="error-txt" style="display: block">{{ $errors->first() }}</div>
        @endif
        <div class="field input">
            <label>Email address</label>
            <input type="email" name="email" placeholder="Enter your email">
        </div>
        <div class="field input">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter new password">
            <i class="fas fa-eye"></i>
        </div>
        <div class="field button">
            <input type="submit" value="Continue to Chat">
        </div>
    </form>
    <div class="link">Not yet signed up? <a href="{{ route('register') }}">Signup now</a></div>
</section>
@endsection
@section('js')
    <script src="{{ asset('js/password-show-hide.js') }}"></script>
    {{-- <script src="{{ asset('js/login.js') }}"></script> --}}
@endsection