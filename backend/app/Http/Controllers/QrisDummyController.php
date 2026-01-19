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
    $request->validate([
        'order_number' => 'required|exists:orders,order_number'
    ]);

    return DB::transaction(function () use ($request) {

        $order = Order::where('order_number', $request->order_number)
            ->lockForUpdate()
            ->firstOrFail();

        // 🔥 JANGAN BLOKIR
        if (in_array($order->status, ['paid', 'success'])) {
            return response()->json([
                'success' => true,
                'message' => 'Order sudah sukses'
            ]);
        }

        $topup = $order->topup;

        // ORDER → PAID
        $order->update([
            'status'  => 'paid',
            'paid_at'=> now(),
        ]);

        // TOPUP → SUCCESS
        if ($topup) {
            $topup->update([
                'status' => 'success',
            ]);
        }

        // TRANSACTION → SUCCESS
        $trx = Transaction::firstOrCreate(
            ['topup_id' => $topup->id],
            [
                'user_id'        => $order->user_id,
                'invoice_id'     => 'INV-' . strtoupper(Str::random(10)),
                'amount'         => $order->amount,
                'payment_method' => 'QRIS',
                'status'         => 'success',
                'finalized_at'   => now(),
            ]
        );

        return response()->json([
            'success' => true,
            'invoice' => $trx->invoice_id
        ]);
    });
}
}
