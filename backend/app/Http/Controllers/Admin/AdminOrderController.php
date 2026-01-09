<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminOrderController extends Controller
{
    /**
     * List orders (payment queue)
     */
    public function index(Request $request)
    {
        $query = Order::with('user');

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where('order_number', 'like', '%' . $request->search . '%');
        }

        return response()->json(
            $query->latest()->paginate(20)
        );
    }

    /**
     * Detail order
     */
    public function show(Order $order)
    {
        return response()->json(
            $order->load('user')
        );
    }

    /**
     * Approve manual payment
     */
    public function approve($id)
    {
        return DB::transaction(function () use ($id) {

            $order = Order::lockForUpdate()->findOrFail($id);

            if ($order->status !== 'waiting_confirmation') {
                return response()->json([
                    'message' => 'Order tidak dalam status konfirmasi'
                ], 422);
            }

            $order->update([
                'status'  => 'paid',
                'paid_at' => now(),
            ]);

            return response()->json([
                'message' => 'Pembayaran berhasil di-approve'
            ]);
        });
    }

    /**
     * Reject manual payment
     */
    public function reject(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string|max:255'
        ]);

        $order = Order::findOrFail($id);

        if ($order->status !== 'waiting_confirmation') {
            return response()->json([
                'message' => 'Order tidak dalam status konfirmasi'
            ], 422);
        }

        $order->update([
            'status' => 'failed',
        ]);

        return response()->json([
            'message' => 'Pembayaran ditolak',
            'reason'  => $request->reason
        ]);
    }
}
