<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class PublicOrderController extends Controller
{
    /**
     * GET /api/orders/{order_number}
     * Untuk halaman checkout & selesai
     */
    public function show(string $orderNumber)
    {
        $order = Order::with([
            'topup',
            'topup.game',
            'topup.package'
        ])->where('order_number', $orderNumber)->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => [
                'order_number' => $order->order_number,
                'status'       => $order->status,
                'amount'       => $order->amount,

                'game' => [
                    'name' => $order->topup?->game?->name,
                ],

                'package' => [
                    'name' => $order->topup?->package?->name,
                ],

                'customer' => [
                    'player_id' => $order->topup?->player_id,
                    'email'     => $order->topup?->email,
                ],
            ]
        ]);
    }
}
