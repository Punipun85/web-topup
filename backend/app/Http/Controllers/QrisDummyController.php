<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Topup;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class QrisDummyController extends Controller
{
    public function pay(Request $request)
    {
        $data = $request->validate([
            'order_number' => 'required|exists:orders,order_number'
        ]);

        return DB::transaction(function () use ($data) {

            $order = Order::where('order_number', $data['order_number'])
                ->lockForUpdate()
                ->first();

            if (!$order) {
                return response()->json([
                    'message' => 'Order tidak ditemukan'
                ], 404);
            }

            if ($order->status !== 'pending') {
                return response()->json([
                    'message' => 'Order sudah diproses'
                ], 422);
            }

            // ✅ ORDER → PAID
            $order->update([
                'status'   => 'paid',
                'paid_at' => now()
            ]);

            // ✅ TOPUP → SUCCESS
            $topup = Topup::find($order->topup_id);
            if ($topup) {
                $topup->update(['status' => 'success']);
            }

            // ✅ TRANSACTION
            $transaction = Transaction::firstOrCreate(
                ['topup_id' => $topup?->id],
                [
                    'invoice_id'     => 'INV-' . strtoupper(Str::random(10)),
                    'amount'         => $order->amount,
                    'payment_method' => 'QRIS',
                    'status'         => 'success',
                    'finalized_at'   => now(),
                ]
            );

            return response()->json([
                'success'      => true,
                'order_number' => $order->order_number,
                'invoice_id'   => $transaction->invoice_id
            ]);
        });
    }
}
