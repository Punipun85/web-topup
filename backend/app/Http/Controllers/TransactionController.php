<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Cari transaction by INVOICE ID
     * GET /api/transaction/{invoice}
     */
    public function show(string $invoice)
    {
        $trx = Transaction::where('invoice_id', $invoice)
            ->with('topup')
            ->first();

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
     * Cari transaction by ORDER NUMBER
     * GET /api/transaction/order/{orderNumber}
     */
    public function showByOrder(string $orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->with('topup.transaction')
            ->first();

        if (!$order || !$order->topup || !$order->topup->transaction) {
            return response()->json([
                'message' => 'Invoice tidak ditemukan'
            ], 404);
        }

        $trx = $order->topup->transaction;

        return response()->json([
            'success' => true,
            'data' => [
                'order_number' => $order->order_number,
                'invoice'      => $trx->invoice_id,
                'amount'       => $trx->amount,
                'status'       => strtoupper($trx->status),
                'created_at'   => $trx->created_at,
            ]
        ]);
    }
}
