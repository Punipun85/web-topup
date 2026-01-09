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
                Transaction::firstOrCreate(
                    ['topup_id' => $topup?->id],
                    [
                        'invoice_id'     => 'INV-' . strtoupper(Str::random(12)),
                        'amount'         => $order->amount,
                        'payment_method' => $order->payment_method,
                        'status'         => 'success',
                        'finalized_at'   => now(),
                    ]
                );

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
            'order_id' => 'required|exists:orders,id'
        ]);

        return DB::transaction(function () use ($request) {

            $order = Order::lockForUpdate()->findOrFail($request->order_id);

            if ($order->status !== 'pending') {
                return response()->json([
                    'message' => 'Order sudah diproses'
                ], 422);
            }

            // 1️⃣ ORDER → PAID
            $order->update([
                'status'  => 'paid',
                'paid_at' => now()
            ]);

            // 2️⃣ TOPUP → SUCCESS
            $topup = Topup::where('order_id', $order->id)->first();
            if ($topup) {
                $topup->update([
                    'status' => 'success'
                ]);
            }

            return response()->json([
                'success' => true
            ]);
        });
    }
}
