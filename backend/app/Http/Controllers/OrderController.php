<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $r)
    {
        $r->validate([
            'product_id' => 'required|exists:products,id',
            'player_id'  => 'required|string'
        ]);

        $user = $r->user();

        return DB::transaction(function () use ($r, $user) {

            $product = Product::lockForUpdate()->find($r->product_id);

            if (!$product || !$product->active) {
                return response()->json([
                    'message' => 'Product not available'
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
                'order_number' => 'ORD-' . now()->format('YmdHis') . '-' . Str::random(5),
                'user_id'      => $user->id,
                'product_id'   => $product->id,
                'player_id'    => $r->player_id,
                'amount'       => $product->price,
                'status'       => 'pending'
            ]);

            $order->transaction()->create([
                'amount'  => $product->price,
                'status'  => 'pending'
            ]);

            return response()->json([
                'order' => $order
            ], 201);
        });
    }
}
