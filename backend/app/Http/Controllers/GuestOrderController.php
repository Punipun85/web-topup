<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Topup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GuestOrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'topup_id'       => 'required|exists:topups,id',
            'payment_method' => 'required|string',
        ]);

        return DB::transaction(function () use ($data) {

            $topup = Topup::where('id', $data['topup_id'])
                ->where('status', 'pending')
                ->lockForUpdate()
                ->first();

            if (!$topup) {
                return response()->json([
                    'message' => 'Topup tidak tersedia'
                ], 400);
            }

            // Cegah double order
            $existing = Order::where('topup_id', $topup->id)
                ->whereIn('status', ['pending', 'waiting_confirmation'])
                ->first();

            if ($existing) {
                return response()->json([
                    'message' => 'Masih ada pembayaran aktif'
                ], 409);
            }

            // ✅ CREATE GUEST ORDER (NO USER)
            $order = Order::create([
                'order_number'   => 'ORD-' . strtoupper(Str::random(12)),
                'topup_id'       => $topup->id,
                'user_id'        => null, // 🔥 GUEST
                'payment_method'=> $data['payment_method'],
                'amount'         => $topup->amount,
                'status'         => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'order_number' => $order->order_number,
                    'amount'       => $order->amount,
                    'status'       => $order->status,
                ]
            ], 201);
        });
    }
}
