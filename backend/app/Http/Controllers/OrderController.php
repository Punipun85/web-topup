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
                    'message' => 'Topup tidak ditemukan atau sudah diproses'
                ], 400);
            }

            // 🔒 Cegah double order
            $existingOrder = Order::where('topup_id', $topup->id)
                ->whereIn('status', ['pending', 'waiting_confirmation'])
                ->first();

            if ($existingOrder) {
                return response()->json([
                    'message' => 'Masih ada pembayaran yang belum selesai'
                ], 409);
            }

            // ✅ CREATE ORDER
            $order = Order::create([
                'order_number'   => 'ORD-' . strtoupper(Str::random(12)),
                'topup_id'       => $topup->id,
                'user_id'        => Auth::id(),
                'payment_method'=> $data['payment_method'],
                'amount'         => $topup->amount,
                'status'         => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Order pembayaran dibuat',
                'data' => [
                    'order_id'     => $order->id,
                    'order_number' => $order->order_number,
                    'topup_code'   => $topup->topup_code,
                    'amount'       => $order->amount,
                    'status'       => $order->status,
                ]
            ], 201);
        });
    }
}
