<?php

use Illuminate\Support\Facades\Route;

// PUBLIC CONTROLLERS
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TopUpPackageController;
use App\Http\Controllers\TopUpController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentWebhookController;
use App\Http\Controllers\LeaderboardController;

// ADMIN CONTROLLERS
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminTopupController;
use App\Http\Controllers\Admin\TopUpPackageAdminController;
use App\Http\Controllers\Admin\AdminGameController;

/*
|--------------------------------------------------------------------------
| AUTH (PUBLIC)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PUBLIC DATA
|--------------------------------------------------------------------------
*/
Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{slug}', [GameController::class, 'show']);
Route::get('/games/{slug}/packages', [TopUpPackageController::class, 'show']);

Route::get('/products/active', [ProductController::class, 'listActive']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/leaderboard', [LeaderboardController::class, 'index']);

/*
|--------------------------------------------------------------------------
| TOPUP & ORDER (PUBLIC)
|--------------------------------------------------------------------------
| Topup  = transaksi bisnis
| Order  = payment attempt
*/
Route::post('/topup', [TopUpController::class, 'store']);
Route::post('/topup/check', [TopUpController::class, 'check']);
Route::get('/topup/public/{topup_code}', [TopUpController::class, 'publicShow']);

Route::post('/orders', [OrderController::class, 'store']);
Route::post('/orders/check', [OrderController::class, 'check'])
    ->middleware('throttle:10,1');

/*
|--------------------------------------------------------------------------
| PAYMENT WEBHOOK
|--------------------------------------------------------------------------
| Gateway callback (finalisasi via TransactionService)
*/
Route::post('/payment/webhook', [PaymentWebhookController::class, 'webhook']);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED USER
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Admin TIDAK mengubah status langsung
| Admin hanya memicu aksi (manual success / fail)
*/
Route::middleware(['auth:sanctum', 'role:admin,moderator'])
    ->prefix('admin')
    ->group(function () {

        // dashboard
        Route::get('/dashboard', [AdminDashboardController::class, 'index']);
        
        // games
        Route::get('/games', [AdminGameController::class, 'index']);
        Route::post('/games', [AdminGameController::class, 'store']);
        Route::put('/games/{game}', [AdminGameController::class, 'update']);
        Route::delete('/games/{game}', [AdminGameController::class, 'destroy']);

        // topups
        Route::get('/topups', [AdminTopupController::class, 'index']);
        Route::get('/topups/{topup}', [AdminTopupController::class, 'show']);

        // admin manual payment (SIMULASI WEBHOOK)
        Route::post('/topups/{topup}/manual-success', [AdminTopupController::class, 'manualSuccess']);
        Route::post('/topups/{topup}/manual-fail', [AdminTopupController::class, 'manualFail']);

        // topup packages
        Route::get('/packages', [TopUpPackageAdminController::class, 'index']);
        Route::put('/packages/{id}', [TopUpPackageAdminController::class, 'update']);
        Route::delete('/packages/{id}/promo', [TopUpPackageAdminController::class, 'removePromo']);
    });
