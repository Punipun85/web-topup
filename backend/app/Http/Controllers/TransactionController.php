<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * GET /api/transaction/history
     * ✅ FUNGSI BARU: Mengambil list transaksi user untuk dashboard
     */
    public function history(Request $request)
    {
        $user = $request->user();

        // Ambil 10 transaksi terakhir
        $transactions = Transaction::where('user_id', $user->id)
                        ->orderBy('created_at', 'desc')
                        ->limit(10)
                        ->get();
        
        // Map data agar nama key sesuai dengan React (React minta: invoice_number, price, item_name)
        // Sesuaikan 'amount' / 'price' dengan database Anda
        $mapped = $transactions->map(function($trx) {
            return [
                'invoice_number' => $trx->invoice_id, 
                'trx_id'         => $trx->id, 
                'item_name'      => $trx->item_name ?? 'Topup Saldo', // Default jika null
                'target_id'      => $trx->target_id ?? '-',
                'price'          => $trx->amount, // React minta 'price', DB biasanya 'amount'
                'status'         => $trx->status,
                'created_at'     => $trx->created_at,
            ];
        });

        return response()->json([
            'data' => $mapped
        ]);
    }

    /**
     * GET /api/transaction/{invoice}
     */
    public function show(string $invoice)
    {
        $trx = Transaction::where('invoice_id', $invoice)
            ->with('topup')
            ->first();

        if (!$trx) {
            return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $trx
        ]);
    }

    /**
     * GET /api/transaction/order/{orderNumber}
     */
    public function showByOrder(string $orderNumber)
{
    $order = Order::where('order_number', $orderNumber)
        ->with(['topup', 'topup.transaction'])
        ->first();

    if (!$order || !$order->topup) {
        return response()->json(['message' => 'Order tidak ditemukan'], 404);
    }

    $trx = $order->topup->transaction;

    return response()->json([
    'success' => true,
    'data' => [
        'order_number' => $order->order_number,
        'invoice'      => $trx->invoice_id,
        'amount'       => $trx->amount,
        'status'       => strtoupper($trx->status ?? $order->status),
        'created_at'   => $trx->created_at
            ->timezone('Asia/Jakarta')
            ->format('Y-m-d H:i:s'),
    ]
]);

}

    /**
 * Cari transaction by REF (ORD / INV)
 * GET /api/transaction/ref/{ref}
 */
public function showByRef(string $ref)
{
    try {
        $trx = null;

        // ORD-xxxx
        if (str_starts_with($ref, 'ORD-')) {
            $order = Order::with('topup.transaction')->where('order_number', $ref)->first();

            if (!$order || !$order->topup || !$order->topup->transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaksi belum tersedia'
                ], 404);
            }

            $trx = $order->topup->transaction;
        }

        // INV-xxxx
        elseif (str_starts_with($ref, 'INV-')) {
            $trx = Transaction::with('topup')->where('invoice_id', $ref)->first();
        }

        if (!$trx) {
            return response()->json([
                'success' => false,
                'message' => 'Transaksi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                // FIELD LAMA (JANGAN DIHAPUS)
                'invoice'   => $trx->invoice_id,
                'status'    => strtoupper($trx->status),
                'amount'    => $trx->amount,
                'game'      => $trx->topup?->game?->name ?? null,
                'package'   => $trx->topup?->package?->name ?? null,
                'player_id' => $trx->topup?->player_id ?? null,
                'email'     => $trx->topup?->email ?? null,

                // FIELD BARU
                'payment_method' => $trx->payment_method,
                'created_at'     => $trx->created_at
                    ->timezone('Asia/Jakarta')
                    ->format('Y-m-d H:i:s'),
            ]
        ]);
    } catch (\Throwable $e) {
        // ⛑️ AGAR TIDAK 500 DI USER
        Log::error('showByRef error', [
            'ref' => $ref,
            'error' => $e->getMessage()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan server'
        ], 500);
    }
}

    public function checkStatus(Request $request)
    {
        // 1. Ambil order_number dari body request frontend
        $ref = $request->input('order_number');

        if (!$ref) {
            return response()->json(['message' => 'Order Number is required'], 400);
        }

        $trx = null;

        // 2. Logika pencarian (mirip showByRef)
        // Jika formatnya INV-... cari di tabel transactions
        if (str_starts_with($ref, 'INV-')) {
            $trx = Transaction::where('invoice_id', $ref)->first();
        }
        // Jika formatnya ORD-... cari di tabel orders -> topup -> transaction
        elseif (str_starts_with($ref, 'ORD-')) {
            $order = Order::with('topup.transaction')->where('order_number', $ref)->first();
            $trx = $order?->topup?->transaction;
        }

        // 3. Jika Transaksi tidak ketemu
        if (!$trx) {
            return response()->json([
                'status' => 'error', 
                'message' => 'Transaksi tidak ditemukan'
            ], 404);
        }

        // 4. Cek Status (PAID / SUCCESS)
        // Sesuaikan string status ini dengan database Anda (case-sensitive)
        if (strtoupper($trx->status) === 'SUCCESS') {
            return response()->json([
                'status' => 'SUCCESS',
                'message' => 'Pembayaran berhasil diterima'
            ], 200); // 200 OK
        }

        // 5. Jika masih PENDING
        return response()->json([
            'status' => 'PENDING',
            'message' => 'Pembayaran belum terdeteksi'
        ], 400); // 400 Bad Request (agar frontend tau ini belum lunas)
    }
}
