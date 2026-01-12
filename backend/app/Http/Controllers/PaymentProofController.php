<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class PaymentProofController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'order_number' => 'required|exists:orders,order_number',
            'proof'        => 'required|image|mimes:jpg,jpeg,png|max:8192', // max 8MB
        ]);

        $order = Order::where('order_number', $request->order_number)->firstOrFail();

        // hanya order pending yang boleh upload bukti
        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Order sudah diproses'
            ], 409);
        }

        $path = $request->file('proof')->store('payment_proofs', 'public');

        $order->update([
            'payment_proof' => $path,
            'status'        => 'waiting_confirmation',
        ]);

        return response()->json([
            'message' => 'Bukti pembayaran berhasil dikirim',
            'data' => [
                'order_number' => $order->order_number,
                'status'       => $order->status,
                'proof_url'    => asset('storage/' . $path),
            ]
        ]);
    }
}
