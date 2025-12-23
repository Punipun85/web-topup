<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PaymentWebhookController extends Controller
{
    public function webhook(Request $request)
    {
        $request->validate([
            'order_number' => 'required|exists:orders,order_number',
            'status'       => 'required|in:success,failed'
        ]);

        return DB::transaction(function () use ($request) {

            $order = Order::where('order_number', $request->order_number)
                ->lockForUpdate()
                ->first();

            // idempotent
            if ($order->status === 'paid') {
                return response()->json(['ok' => true]);
            }

            $transaction = $order->transaction;
            
            if (!$transaction) {
            $transaction = $order->transaction()->create([
             'provider' => 'dummy',
             'amount'   => $order->amount,
             'status'   => 'pending'
            ]);
        }

            // GENERATE DUMMY PROVIDER TRX ID
            $providerTrxId = 'DUMMY-' . strtoupper(Str::random(12));

            // UPDATE TRANSACTION
            $transaction->update([
                'provider'         => 'dummy',
                'provider_trx_id'  => $providerTrxId,
                'payment_method'   => $transaction->payment_method ?? 'manual',
                'status'           => $request->status === 'success' ? 'success' : 'failed',
                'raw_response'     => $request->all()
            ]);

            // UPDATE ORDER
            $order->update([
                'status' => $request->status === 'success' ? 'paid' : 'failed'
            ]);

            return response()->json([
                'message'          => 'Webhook processed',
                'order_number'     => $order->order_number,
                'order_status'     => $order->status,
                'provider_trx_id'  => $providerTrxId
            ]);
        });
    }
}
