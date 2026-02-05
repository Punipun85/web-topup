<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Topup;
use App\Models\Transaction;
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
            $existingOrder = Order::where('topup_id', $topup->id)->first();
            if ($existingOrder) {
                return response()->json([
                    'message' => 'Order sudah ada'
                ], 409);
            }

            // ✅ ORDER
            $order = Order::create([
                'order_number'    => 'ORD-' . strtoupper(Str::random(12)),
                'topup_id'        => $topup->id,
                'user_id'         => Auth::id(),
                'payment_method' => $data['payment_method'],
                'amount'          => $topup->amount,
                'status'          => 'paid', // ⬅️ langsung paid
            ]);

            // ✅ TOPUP → SUCCESS
            $topup->update([
                'status' => 'success',
            ]);

            // ✅ TRANSACTION → SUCCESS (INI YANG HILANG DARI HIDUPMU)
            $transaction = Transaction::create([
                'user_id'        => Auth::id(),
                'topup_id'       => $topup->id,
                'invoice_id'     => 'INV-' . strtoupper(Str::random(10)),
                'amount'         => $order->amount,
                'payment_method' => $order->payment_method,
                'status'         => 'success',
                'finalized_at'   => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Order berhasil dibuat',
                'data' => [
                    'order_id'     => $order->id,
                    'order_number' => $order->order_number,
                    'invoice_id'   => $transaction->invoice_id,
                    'amount'       => $transaction->amount,
                    'status'       => 'SUCCESS',
                ]
            ], 201);
        });
    }
}
