<?php

namespace App\Http\Controllers;

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

            // 🔒 LOCK ORDER
            $order = Order::where('order_number', $data['order_number'])
                ->lockForUpdate()
                ->firstOrFail();

            if ($order->status !== 'pending') {
                return response()->json([
                    'message' => 'Order sudah diproses'
                ], 422);
            }

            // 🔍 AMBIL TOPUP (WAJIB SEBELUM DIPAKAI)
            $topup = Topup::where('id', $order->topup_id)
                ->lockForUpdate()
                ->firstOrFail();

            // ✅ ORDER → PAID
            $order->update([
                'status'  => 'paid',
                'paid_at'=> now(),
            ]);

            // ✅ TOPUP → PROCESS
            $topup->update([
                'status' => 'process',
            ]);

            // ✅ TRANSACTION → PROCESS
            $transaction = Transaction::updateOrCreate(
                ['topup_id' => $topup->id],
                [
                    'user_id'        => $topup->user_id,
                    'invoice_id'     => 'INV-' . strtoupper(Str::random(10)),
                    'amount'         => $order->amount,
                    'payment_method' => 'QRIS',
                    'status'         => 'success',
                    'finalized_at'   => null,
                ]
            );

            return response()->json([
                'success'      => true,
                'order_number' => $order->order_number,
                'invoice_id'   => $transaction->invoice_id,
                'status'       => 'process'
            ]);
        });
    }
}
