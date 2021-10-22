@extends('layouts.default')
@section('content')
<section class="chat-area">
    <header>
        <a href="{{ route('users.index') }}" class="back-icon"><i class="fas fa-arrow-left"></i></a>
        <img src="{{ asset('storage/images/' . $data->avatar_path) }}" alt="">
        <div class="details">
            <span>{{ $data->first_name . ' ' . $data->last_name }}</span>
            <p>{{ Config('constant.status')[$data->status]['text'] }}</p>
        </div>
    </header>
    <div class="chat-box">
        
    </div>
    <form action="{{ route('users.send-chat', $data->id) }}" class="typing-area">
        <input type="hidden" name="incoming" value="{{ $data->id }}">
        <input type="text" name="message" placeholder="Type a message here...">
        <button><i class="fab fa-telegram-plane"></i></button>
    </form>
</section>
@endsection
@section('js')
    <script src="{{ asset('js/chat.js') }}"></script>
@endsection

