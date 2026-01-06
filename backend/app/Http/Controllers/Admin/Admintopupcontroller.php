<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Topup;
use App\Services\TransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AdminTopupController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Topup::with(['user', 'game', 'package'])
                ->latest()
                ->get(),
        ]);
    }

    public function show(Topup $topup): JsonResponse
    {
        return response()->json(
            $topup->load(['user', 'game', 'package'])
        );
    }

    /**
     * Admin manual SUCCESS
     */
    public function manualSuccess(
        Topup $topup,
        TransactionService $service
    ): JsonResponse {

        if ($topup->status !== 'pending') {
            return response()->json([
                'message' => 'Topup sudah diproses'
            ], 409);
        }

        // buat order manual
        $order = Order::create([
            'order_number'    => 'MANUAL-' . now()->format('YmdHis'),
            'topup_id'        => $topup->id,
            'user_id'         => Auth::id(),
            'payment_method' => 'manual',
            'amount'          => $topup->amount,
            'status'          => 'pending',
        ]);

        // finalisasi lewat satu pintu
        $service->finalize($order, 'success', [
            'provider' => 'manual',
            'admin_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Topup berhasil diset SUCCESS (manual)'
        ]);
    }

    /**
     * Admin manual FAIL
     */
    public function manualFail(
        Topup $topup,
        TransactionService $service
    ): JsonResponse {

        if ($topup->status !== 'pending') {
            return response()->json([
                'message' => 'Topup sudah diproses'
            ], 409);
        }

        $order = Order::create([
            'order_number'    => 'MANUAL-FAIL-' . now()->format('YmdHis'),
            'topup_id'        => $topup->id,
            'user_id'         => Auth::id(),
            'payment_method' => 'manual',
            'amount'          => $topup->amount,
            'status'          => 'pending',
        ]);

        $service->finalize($order, 'failed', [
            'provider' => 'manual',
            'admin_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Topup ditandai FAILED (manual)'
        ]);
    }
}
