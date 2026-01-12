<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| PUBLIC CONTROLLERS
|--------------------------------------------------------------------------
*/
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TopUpPackageController;
use App\Http\Controllers\TopUpController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentWebhookController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PaymentProofController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\PublicOrderController;
use App\Http\Controllers\QrisDummyController;

/*
|--------------------------------------------------------------------------
| ADMIN CONTROLLERS
|--------------------------------------------------------------------------
*/
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminTopUpController;
use App\Http\Controllers\Admin\AdminGameController;
use App\Http\Controllers\Admin\TopUpPackageAdminController;
use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\AdminOrderController;

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
Route::get('/payment-methods', [PaymentMethodController::class, 'index']);

/*
|--------------------------------------------------------------------------
| TOPUP & TRANSACTION (PUBLIC)
|--------------------------------------------------------------------------
*/
Route::post('/topups', [TopUpController::class, 'store']);
Route::post('/topups/check', [TopUpController::class, 'check']);
Route::get('/topups/public/{topup_code}', [TopUpController::class, 'publicShow']);

Route::post('/orders', [OrderController::class, 'store']);
Route::post('/orders/check', [OrderController::class, 'check'])
    ->middleware('throttle:10,1');

Route::get('/transaction/{invoice}', [TransactionController::class, 'show']);
Route::get('/transaction/order/{orderNumber}', [TransactionController::class, 'showByOrder']);


/*
|--------------------------------------------------------------------------
| PAYMENT
|--------------------------------------------------------------------------
*/
Route::post('/payment/webhook', [PaymentWebhookController::class, 'webhook']);
Route::post('/payment/upload-proof', [PaymentProofController::class, 'store']);
Route::post('/payment/qris-dummy', [QrisDummyController::class, 'pay']);
Route::get('/orders/{order_number}', [PublicOrderController::class, 'show']);



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
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:admin,cs'])
    ->prefix('admin')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [AdminDashboardController::class, 'index']);

        // Games
        Route::get('/games', [AdminGameController::class, 'index']);
        Route::post('/games', [AdminGameController::class, 'store']);
        Route::put('/games/{game}', [AdminGameController::class, 'update']);
        Route::delete('/games/{game}', [AdminGameController::class, 'destroy']);

        // Topups
        Route::get('/topups', [AdminTopUpController::class, 'index']);
        Route::get('/topups/{id}', [AdminTopUpController::class, 'show']);
        Route::post('/topups/{id}/approve', [AdminTopUpController::class, 'approve']);
        Route::post('/topups/{id}/fail', [AdminTopUpController::class, 'fail']);

        //orders
        Route::get('/orders', [AdminOrderController::class, 'index']);
        Route::get('/orders/{order}', [AdminOrderController::class, 'show']);

        // Topup Packages
        Route::get('/packages', [TopUpPackageAdminController::class, 'index']);
        Route::put('/packages/{id}', [TopUpPackageAdminController::class, 'update']);
        Route::delete('/packages/{id}/promo', [TopUpPackageAdminController::class, 'removePromo']);

        // Activity Logs
        Route::get('/activity-logs', [ActivityLogController::class, 'index']);
        Route::get('/activity-logs/{id}', [ActivityLogController::class, 'show']);
    });

    Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/user/profile', [DashboardController::class, 'profile']);
    Route::get('/user/stats', [DashboardController::class, 'stats']);
    Route::get('/transaction/history', [DashboardController::class, 'history']);

});