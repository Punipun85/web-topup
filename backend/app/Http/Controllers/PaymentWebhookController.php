<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class PaymentWebhookController extends Controller
{
    public function webhook(Request $r)
    {
        // 1. Verify signature
        if ($r->header('X-WEBHOOK-SIGNATURE') !== config('services.payment.webhook_secret')) {
            return response()->json(['error' => 'Invalid signature'], 403);
        }

        $payload = $r->all();

        $order = Order::where('order_number', $payload['order_number'] ?? null)->first();
        if (!$order) {
            return response()->json(['error' => 'order_not_found'], 404);
        }

        // 2. Idempotent check
        if ($order->status === 'paid') {
            return response()->json(['ok' => true]);
        }

        return DB::transaction(function () use ($order, $payload) {

            $status = $payload['status'] ?? 'failed';

            $order->status = $status === 'success' ? 'paid' : 'failed';
            $order->payment_payload = $payload;
            $order->save();

            $tx = $order->transaction()->first();

            if ($tx) {
                $tx->transaction_id = $payload['transaction_id'] ?? null;
                $tx->status = $status === 'success' ? 'success' : 'failed';
                $tx->raw_response = $payload;
                $tx->save();
            }

            // 3. Fulfillment (ASYNC recommended)
            if ($status === 'success') {
                // dispatch(new ProcessTopup($order));
            }

            return response()->json(['ok' => true]);
        });
    }
}
