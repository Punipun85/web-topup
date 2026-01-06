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
    public function webhook(Request $request)
    {
        $data = $request->validate([
            'order_number' => 'required|exists:orders,order_number',
            'status'       => 'required|in:success,failed',
        ]);

        return DB::transaction(function () use ($data, $request) {

            $order = Order::where('order_number', $data['order_number'])
                ->lockForUpdate()
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            // 🔒 Idempotent guard
            if (in_array($order->status, ['paid', 'failed'])) {
                return response()->json(['ok' => true]);
            }

            $topup = Topup::where('id', $order->topup_id)
                ->lockForUpdate()
                ->first();

            if (!$topup) {
                return response()->json(['message' => 'Topup not found'], 404);
            }

            if ($data['status'] === 'success') {

                // UPDATE ORDER
                $order->update([
                    'status' => 'paid',
                ]);

                // UPDATE TOPUP (TRANSAKSI BISNIS)
                $topup->update([
                    'status' => 'success',
                ]);

                // INSERT LEDGER (ONCE)
                Transaction::create([
                    'topup_id'       => $topup->id,
                    'invoice_id'     => 'INV-' . strtoupper(Str::random(12)),
                    'game_name'      => $topup->game->name ?? '-',
                    'package_name'   => $topup->package->name ?? '-',
                    'amount'         => $topup->amount,
                    'price'          => $topup->amount,
                    'payment_method' => $order->payment_method,
                    'payer_email'    => $topup->email,
                    'status'         => 'success',
                    'finalized_at'   => now(),
                ]);

            } else {

                // FAILED PAYMENT
                $order->update([
                    'status' => 'failed',
                ]);

                // optional: tandai topup gagal
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
