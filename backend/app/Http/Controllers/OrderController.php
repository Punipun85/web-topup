<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * CREATE ORDER FROM TOPUP (PUBLIC)
     */
    public function store(Request $r)
    {
        $r->validate([
            'topup_id'        => 'required|exists:topups,id',
            'payment_method' => 'required|string'
        ]);

        return DB::transaction(function () use ($r) {

            $topup = DB::table('topups')
                ->where('id', $r->topup_id)
                ->lockForUpdate()
                ->first();

            if (!$topup) {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Topup tidak ditemukan'
                ], 404);
            }

            if ($topup->status !== 'pending') {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Topup tidak bisa diproses'
                ], 400);
            }

            // CREATE ORDER
            $order = Order::create([
                'order_number'      => 'ORD-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(5)),
                'user_id'           => $topup->user_id,
                'topup_package_id'  => $topup->package_id,
                'player_id'         => $topup->player_id,
                'amount'            => $topup->amount,
                'status'            => 'pending',
                'payment_payload'   => [
                    'method'    => $r->payment_method,
                    'topup_id'  => $topup->id
                ]
            ]);

            // CREATE TRANSACTION
            $order->transaction()->create([
                'amount' => $topup->amount,
                'status' => 'pending',
                'payment_method' => $r->payment_method,
                'provider' => 'dummy'
            ]);

            // UPDATE TOPUP STATUS
            DB::table('topups')
                ->where('id', $topup->id)
                ->update([
                    'status' => 'waiting_payment',
                    'updated_at' => now()
                ]);

            return response()->json([
                'status'        => 'pending_payment',
                'message'       => 'Order pembayaran berhasil dibuat',
                'order_number'  => $order->order_number,
                'payment_method' => $r->payment_method,
                'amount'        => $order->amount
            ], 201);
        });
    }

    /**
     * CHECK ORDER (PUBLIC)
     */
    public function check(Request $r)
    {
        $r->validate([
            'order_number' => 'required|string',
            'player_id'    => 'required|string'
        ]);

        $order = Order::where('order_number', $r->order_number)
            ->where('player_id', $r->player_id)
            ->with('transaction:id,order_id,status')
            ->first();

        if (!$order) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'order_number'   => $order->order_number,
            'status'         => $order->status,
            'amount'         => $order->amount,
            'payment_status' => $order->transaction?->status,
            'created_at'     => $order->created_at->toDateTimeString()
        ]);
    }
}
