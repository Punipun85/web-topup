<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentWebhookController;
use App\Http\Controllers\TopUpController;

// auth (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// public product
Route::get('/products/active', [ProductController::class, 'listActive']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// PUBLIC ORDER
Route::post('/orders', [OrderController::class, 'store']);
Route::post('/orders/check', [OrderController::class, 'check'])
    ->middleware('throttle:10,1');
Route::get('/topup/public/{topup_code}', [TopUpController::class, 'publicShow']);

// top-up (public)
Route::post('/topup/check', [TopUpController::class, 'check']);
Route::post('/topup', [TopUpController::class, 'store']);

// protected (SANCTUM TOKEN)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// payment webhook (public but secured by signature)
Route::post('/payment/webhook', [PaymentWebhookController::class, 'webhook']);



