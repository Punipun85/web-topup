<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Ambil transaksi berdasarkan ORDER NUMBER
     */
    public function showByOrder(string $orderNumber)
    {
        $order = Order::with(['topup.transaction', 'topup.game', 'topup.package'])
            ->where('order_number', $orderNumber)
            ->first();

        if (!$order || !$order->topup || !$order->topup->transaction) {
            return response()->json([
                'message' => 'Data transaksi tidak ditemukan'
            ], 404);
        }

        $topup = $order->topup;
        $trx   = $topup->transaction;

        return response()->json([
            'success' => true,
            'data' => [
                'order_number' => $order->order_number,
                'invoice'      => $trx->invoice_id,
                'status'       => $order->status,
                'amount'       => $trx->amount,
                'payment_method' => $trx->payment_method,
                'game'         => $topup->game->name ?? '-',
                'package'      => $topup->package->name ?? '-',
                'player_id'    => $topup->player_id,
                'email'        => $topup->email,
                'paid_at'      => $order->paid_at,
            ]
        ]);
    }
}
