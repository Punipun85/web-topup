<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Topup;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentWebhookController extends Controller
{
    /**
     * REAL / GENERIC PAYMENT WEBHOOK
     * (Midtrans / Xendit / dll)
     */
    public function webhook(Request $request)
    {
        $data = $request->validate([
            'order_number' => 'required|exists:orders,order_number',
            'status'       => 'required|in:success,failed',
        ]);

        return DB::transaction(function () use ($data) {

            $order = Order::where('order_number', $data['order_number'])
                ->lockForUpdate()
                ->firstOrFail();

            // idempotent guard
            if (in_array($order->status, ['paid', 'failed'])) {
                return response()->json(['ok' => true]);
            }

            $topup = Topup::where('order_id', $order->id)->first();

            if ($data['status'] === 'success') {

                // 1️⃣ ORDER → PAID
                $order->update([
                    'status'  => 'paid',
                    'paid_at' => now(),
                ]);

                // 2️⃣ TOPUP → SUCCESS
                if ($topup) {
                    $topup->update([
                        'status' => 'success',
                    ]);
                }

                // 3️⃣ LEDGER (ONCE)
               $trx = Transaction::firstOrCreate(
    ['topup_id' => $topup->id],
    [
        'invoice_id'     => 'INV-' . strtoupper(Str::random(12)),
        'amount'         => $order->amount,
        'payment_method' => $order->payment_method,
        'status'         => 'success',
        'finalized_at'   => now(),
    ]
);

// 🔧 FIX USER_ID (WAJIB)
if ($trx->user_id === null) {
    $trx->update([
        'user_id' => $order->user_id ?? $topup->user_id
    ]);
}   
            } else {

                // PAYMENT FAILED
                $order->update([
                    'status' => 'failed',
                ]);

                if ($topup) {
                    $topup->update([
                        'status' => 'failed',
                    ]);
                }
            }

            return response()->json([
                'message'      => 'Webhook processed',
                'order_number' => $order->order_number,
                'order_status' => $order->status,
                'topup_status' => $topup?->status,
            ]);
        });
    }

    /**
     * 🔥 QRIS DUMMY (FRONTEND SIMULATION)
     */
    public function qrisDummy(Request $request)
{
    $request->validate([
        'order_number' => 'required|exists:orders,order_number'
    ]);

    return DB::transaction(function () use ($request) {

        $order = Order::where('order_number', $request->order_number)
            ->lockForUpdate()
            ->firstOrFail();

        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Order sudah diproses'
            ], 422);
        }

        // ORDER → PAID
        $order->update([
            'status'  => 'paid',
            'paid_at' => now()
        ]);

        // TOPUP → SUCCESS
        $topup = $order->topup;
        if ($topup) {
            $topup->update([
                'status' => 'success'
            ]);
        }

        // TRANSACTION (PASTIKAN ADA)
        Transaction::firstOrCreate(
            ['topup_id' => $topup->id],
            [
                'user_id'        => $order->user_id,
                'invoice_id'     => 'INV-' . strtoupper(Str::random(12)),
                'amount'         => $order->amount,
                'payment_method' => $order->payment_method,
                'status'         => 'success',
                'finalized_at'   => now(),
            ]
        );

        return response()->json(['success' => true]);
    });
}
}
