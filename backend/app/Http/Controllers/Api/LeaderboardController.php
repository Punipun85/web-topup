<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB; // <--- Wajib Import ini buat query database
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        // INI ADALAH PENGGANTI SQL MENTAH TADI
        // Laravel akan menerjemahkan ini menjadi SQL otomatis
        $sultans = DB::table('transactions')
            ->join('users', 'transactions.user_id', '=', 'users.id')
            ->select(
                'users.name as username', 
                DB::raw('SUM(transactions.amount) as total') // Hitung total topup
            )
            ->where('transactions.status', 'PAID') // Hanya hitung yang sukses
            // ->whereMonth('transactions.created_at', now()->month) // Opsional: Cuma bulan ini
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total') // Urutkan dari yang terbesar
            ->limit(10) // Ambil 10 besar saja
            ->get();

        // Tambahkan Ranking manual (1, 2, 3...) di sisi backend
        $rankedSultans = $sultans->map(function ($item, $key) {
            $item->rank = $key + 1;
            // Logika role sederhana (bisa disesuaikan logic game Anda)
            $item->role = $item->rank == 1 ? 'Sultan' : 'Member'; 
            return $item;
        });

        return response()->json($rankedSultans);
    }
}