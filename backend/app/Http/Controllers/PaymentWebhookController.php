<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\TopUp;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentWebhookController extends Controller
{
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

            // 🔒 Idempotent guard
            if (in_array($order->status, ['paid', 'failed'])) {
                return response()->json(['ok' => true]);
            }

            $topup = TopUp::where('id', $order->topup_id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($data['status'] === 'success') {

                // 1️⃣ UPDATE ORDER
                $order->update([
                    'status' => 'paid',
                    'paid_at' => now(),
                ]);

                // 2️⃣ UPDATE TOPUP
                $topup->update([
                    'status' => 'success',
                ]);

                // 3️⃣ INSERT TRANSACTION LEDGER (ONCE)
                Transaction::firstOrCreate(
                    [
                        'order_id' => $order->id, // unique anchor
                    ],
                    [
                        'invoice_id'     => 'INV-' . strtoupper(Str::random(12)),
                        'amount'         => $topup->amount,
                        'payment_method' => $order->payment_method,
                        'payer_email'    => $topup->email,
                        'status'         => 'success',
                        'finalized_at'   => now(),
                    ]
                );

            } else {

                // FAILED PAYMENT
                $order->update([
                    'status' => 'failed',
                ]);

                $topup->update([
                    'status' => 'failed',
                ]);
            }

            return response()->json([
                'message'      => 'Webhook processed',
                'order_number' => $order->order_number,
                'order_status' => $order->status,
                'topup_status' => $topup->status,
            ]);
        });
    }
}
