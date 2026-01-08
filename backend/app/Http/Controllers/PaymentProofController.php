<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Storage;

class PaymentProofController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'invoice' => 'required|string',
            'proof'   => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Cari transaksi
        $transaction = Transaction::where('invoice_id', $request->invoice)->first();

        if (!$transaction) {
            return response()->json([
                'message' => 'Invoice tidak ditemukan'
            ], 404);
        }

        // Simpan file
        $path = $request->file('proof')->store('payment_proofs', 'public');

        // Update transaksi
        $transaction->update([
            'payment_proof' => $path,
            'status' => 'WAITING_CONFIRMATION',
        ]);

        return response()->json([
            'message' => 'Bukti pembayaran berhasil diupload',
            'data' => [
                'invoice' => $transaction->invoice_id,
                'status' => $transaction->status,
                'proof_url' => asset('storage/' . $path),
            ]
        ]);
    }
}
