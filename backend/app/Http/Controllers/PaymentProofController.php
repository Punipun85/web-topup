<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentProofController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'order_number' => 'required|exists:orders,order_number',
            'proof' => 'required|image'
        ]);

        return DB::transaction(function () use ($request) {

            $order = Order::where('order_number', $request->order_number)
                ->lockForUpdate()
                ->firstOrFail();

            $topup = $order->topup;

            // simpan file
            $path = $request->file('proof')->store('payment_proofs', 'public');

            // ORDER → PAID
            $order->update([
                'status' => 'paid',
            ]);

            // TOPUP → SUCCESS
            if ($topup) {
                $topup->update([
                    'status' => 'success'
                ]);
            }

            // TRANSACTION → SUCCESS
           $trx = Transaction::updateOrCreate(
    ['topup_id' => $topup->id],
    [
        'user_id'        => $order->user_id,
        'invoice_id'     => 'INV-' . strtoupper(Str::random(12)),
        'amount'         => $order->amount,
        'payment_method' => $order->payment_method,
        'status'         => 'success',
        'payment_proof'  => $path,
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
