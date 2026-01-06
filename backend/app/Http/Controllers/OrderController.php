<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Topup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Create payment attempt for a topup
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'topup_id'        => 'required|exists:topups,id',
            'payment_method' => 'required|string',
        ]);

        return DB::transaction(function () use ($data) {

            $topup = Topup::where('id', $data['topup_id'])
                ->where('status', 'pending')
                ->lockForUpdate()
                ->first();

            if (!$topup) {
                return response()->json([
                    'message' => 'Topup tidak ditemukan atau sudah diproses'
                ], 400);
            }

            // optional: cegah double pending payment
            $activeOrder = Order::where('topup_id', $topup->id)
                ->where('status', 'pending')
                ->first();

            if ($activeOrder) {
                return response()->json([
                    'message' => 'Masih ada pembayaran yang belum selesai'
                ], 409);
            }

            $order = Order::create([
                'order_number'   => 'ORD-' . strtoupper(Str::random(12)),
                'topup_id'       => $topup->id,
                'user_id'        => Auth::id(),
                'payment_method'=> $data['payment_method'],
                'amount'         => $topup->amount, // snapshot
                'status'         => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Order pembayaran dibuat',
                'data' => [
                    'order_id'      => $order->id,
                    'order_number'  => $order->order_number,
                    'payment_method' => $order->payment_method,
                    'status'        => $order->status,
                    'amount'        => $order->amount,
                ]
            ], 201);
        });
    }

    /**
     * Check payment attempt status
     */
    public function check(Request $request)
    {
        $data = $request->validate([
            'order_number' => 'required|string',
        ]);

        $order = Order::where('order_number', $data['order_number'])
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'order_number' => $order->order_number,
            'status'       => $order->status,
            'amount'       => $order->amount,
            'created_at'   => $order->created_at->toDateTimeString(),
        ]);
    }
}
