<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;
use App\Models\Topup;
use Illuminate\Http\Request;

class LookupController extends Controller
{
    public function __invoke(string $code)
    {
        // ORDER NUMBER
        if (str_starts_with($code, 'ORD-')) {
            $order = Order::where('order_number', $code)->first();

            if (!$order) {
                return response()->json(['message' => 'Order tidak ditemukan'], 404);
            }

            return response()->json([
                'type' => 'order',
                'data' => [
                    'date' => $order->created_at->toDateString(),
                    'code' => $order->order_number,
                    'status' => $order->status,
                ]
            ]);
        }

        // INVOICE TRANSACTION
        if (str_starts_with($code, 'INV-')) {
            $trx = Transaction::where('invoice_id', $code)->first();

            if (!$trx) {
                return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
            }

            return response()->json([
                'type' => 'transaction',
                'data' => [
                    'date' => $trx->created_at->toDateString(),
                    'code' => $trx->invoice_id,
                    'status' => $trx->status,
                ]
            ]);
        }

        // TOPUP CODE
        if (str_starts_with($code, 'TP-')) {
            $topup = Topup::where('topup_code', $code)->first();

            if (!$topup) {
                return response()->json(['message' => 'Topup tidak ditemukan'], 404);
            }

            return response()->json([
                'type' => 'topup',
                'data' => [
                    'date' => $topup->created_at->toDateString(),
                    'code' => $topup->topup_code,
                    'status' => $topup->status,
                ]
            ]);
        }

        return response()->json([
            'message' => 'Format kode tidak dikenali'
        ], 422);
    }
}
