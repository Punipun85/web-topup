<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * CREATE ORDER (PUBLIC)
     */
    public function store(Request $r)
    {
        $r->validate([
            'product_id' => 'required|exists:products,id',
            'player_id'  => 'required|string|max:100'
        ]);

        return DB::transaction(function () use ($r) {

            $product = Product::lockForUpdate()->find($r->product_id);

            if (!$product || !$product->active) {
                return response()->json([
                    'message' => 'Product tidak tersedia'
                ], 400);
            }

            if ($product->stock <= 0) {
                return response()->json([
                    'message' => 'Stock habis'
                ], 400);
            }

            // kurangi stock
            $product->decrement('stock');

            $order = Order::create([
                'order_number' => 'ORD-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(5)),
                'user_id'      => null, // PUBLIC ORDER
                'product_id'   => $product->id,
                'player_id'    => $r->player_id,
                'amount'       => $product->price,
                'status'       => 'pending'
            ]);

            $order->transaction()->create([
                'amount' => $product->price,
                'status' => 'pending'
            ]);

            return response()->json([
                'order_number' => $order->order_number,
                'status'       => $order->status,
                'amount'       => $order->amount
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
            ->with(['product:id,name', 'transaction:id,order_id,status'])
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'order_number' => $order->order_number,
            'status'       => $order->status,
            'product'      => $order->product->name,
            'amount'       => $order->amount,
            'payment_status' => $order->transaction?->status,
            'created_at'   => $order->created_at->toDateTimeString()
        ]);
    }
}
