<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;

class GuestTransactionController extends Controller
{
    /**
     * GET guest/transaction/ref/{ref}
     * ref bisa ORD-xxxx atau INV-xxxx
     */
    public function showByRef(string $ref)
    {
        if (str_starts_with($ref, 'INV-')) {
            $trx = Transaction::where('invoice_id', $ref)->first();
        } elseif (str_starts_with($ref, 'ORD-')) {
            $order = Order::with('topup.transaction')
                ->where('order_number', $ref)
                ->first();

            $trx = $order?->topup?->transaction;
        } else {
            $trx = null;
        }

        if (!$trx) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'invoice'        => $trx->invoice_id,
                'status'         => strtoupper($trx->status),
                'amount'         => $trx->amount,
                'payment_method'=> $trx->payment_method,
                'created_at'     => $trx->created_at,
            ]
        ]);
    }

    /**
     * (Opsional) GET guest/transaction/order/{orderNumber}
     */
    public function showByOrder(string $orderNumber)
    {
        $order = Order::with('topup.transaction')
            ->where('order_number', $orderNumber)
            ->first();

        $trx = $order?->topup?->transaction;

        if (!$trx) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $trx
        ]);
    }

    /**
     * (Opsional) GET guest/transaction/{invoice}
     */
    public function show(string $invoice)
    {
        $trx = Transaction::where('invoice_id', $invoice)->first();

        if (!$trx) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $trx
        ]);
    }
}
