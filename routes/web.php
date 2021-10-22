<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('auth')->group(function() {
    

    Route::name('users.')->group(function() {
        Route::get('/', 'UserController@index')->name('index');
        Route::post('/search', 'UserController@search')->name('search');
        Route::get('/chat/{id}', 'UserController@chat')->name('chat');
        Route::post('/send-chat/{id}', 'UserController@sendChat')->name('send-chat');
        Route::get('/get-chat/{id}', 'UserController@getChat')->name('get-chat');
    });
});

require __DIR__.'/auth.php';
