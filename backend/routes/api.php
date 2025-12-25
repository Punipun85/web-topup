<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentWebhookController;
use App\Http\Controllers\TopUpController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\TopUpPackageController;
use App\Http\Controllers\Admin\TopUpPackageAdminController;

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

Route::middleware(['auth:sanctum', 'role:admin,moderator'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/packages', [TopUpPackageAdminController::class, 'index']);
        Route::put('/packages/{id}', [TopUpPackageAdminController::class, 'update']);
        Route::delete('/packages/{id}/promo', [TopUpPackageAdminController::class, 'removePromo']);
    });

Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{slug}', [GameController::class, 'show']);
Route::get('/games/{slug}/packages', [TopUpPackageController::class, 'show']);

// payment webhook (public but secured by signature)
Route::post('/payment/webhook', [PaymentWebhookController::class, 'webhook']);



Route::get('/topup/package/{slug}', [TopUpPackageController::class, 'show']);