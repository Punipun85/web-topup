<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'email' => 'required|email',
            'game_user_id' => 'required',
            'game' => 'required',
            'item_name' => 'required',
            'amount' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'total_price' => 'required|numeric',
        ]);

        // 2. Buat Invoice ID Unik
        $invoice = 'TRX-' . strtoupper(Str::random(5)) . '-' . time();

        try {
            // 3. Simpan ke Database (Status PENDING)
            $transaction = Transaction::create([
                'invoice_id' => $invoice,
                'email' => $request->email,
                'game_user_id' => $request->game_user_id,
                'zone_id' => $request->zone_id ?? null,
                'game' => $request->game,
                'item_name' => $request->item_name,
                'amount' => $request->amount,
                'price' => $request->price,
                'quantity' => $request->quantity,
                'total_price' => $request->total_price,
                'payment_method' => 'MANUAL_TRANSFER', // Kita set manual
                'status' => 'PENDING',
            ]);

            // 4. Kirim Respon Sukses ke Frontend
            return response()->json([
                'success' => true,
                'message' => 'Pesanan berhasil dibuat. Silakan lakukan pembayaran manual.',
                'data' => $transaction
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}