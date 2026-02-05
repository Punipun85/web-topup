<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Transaction; // Pastikan Model Transaction ada
use App\Models\User;

class DashboardController extends Controller
{
    // 1. API UNTUK PROFILE
    public function profile(Request $request)
    {
        $user = auth()->user(); // Ambil user yang sedang login

        return response()->json([
            'data' => [
                'name'  => $user->name,
                'phone' => $user->phone ?? '-', // Pastikan kolom phone ada di DB, atau default '-'
                'level' => $user->role ?? 'Member', // Sesuaikan dengan kolom role/level
                'avatar'=> $user->name, // React akan mengambil inisial dari nama ini
            ]
        ]);
    }

    // 2. API UNTUK STATISTIK (KOTAK-KOTAK)
    public function stats(Request $request)
    {
        $userId = auth()->id();

        // Contoh logika sederhana (Sesuaikan dengan nama tabel & kolom Anda)
        // Jika belum ada tabel transaksi, ini akan return 0 semua agar tidak error
        
        $totalTrx   = Transaction::where('user_id', $userId)->count();
        $totalSales = Transaction::where('user_id', $userId)->where('status', 'sukses')->sum('price');
        
        $pending    = Transaction::where('user_id', $userId)->where('status', 'pending')->count();
        $process    = Transaction::where('user_id', $userId)->where('status', 'processing')->count();
        $success    = Transaction::where('user_id', $userId)->where('status', 'sukses')->count();
        $failed     = Transaction::where('user_id', $userId)->where('status', 'gagal')->count();

        return response()->json([
            'data' => [
                'total_trx'   => $totalTrx,
                'total_sales' => $totalSales,
                'pending'     => $pending,
                'process'     => $process,
                'success'     => $success,
                'failed'      => $failed
            ]
        ]);
    }

    // 3. API UNTUK TABEL RIWAYAT
    public function history(Request $request)
    {
        $userId = auth()->id();

        // Ambil 5 transaksi terakhir
        $transactions = Transaction::where('user_id', $userId)
                        ->latest()
                        ->take(5)
                        ->get();

        // Format data agar sesuai dengan React
        $formatted = $transactions->map(function($trx) {
            return [
                'invoice'    => $trx->invoice_number ?? 'INV-???',
                'trx_id'     => $trx->id,
                'item_name'  => $trx->item_name ?? 'Item Game',
                'target'     => $trx->target_id ?? '-', // User Input (ID Game)
                'price'      => $trx->price,
                'created_at' => $trx->created_at,
                'status'     => $trx->status
            ];
        });

        return response()->json([
            'data' => $formatted
        ]);
    }
}