<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TopUpController extends Controller
{
    public function store(Request $request)
    {
        // Validasi sederhana
        $request->validate([
            'user_id' => 'required|integer',
            'game_id' => 'required|integer',
            'package_id' => 'required|integer',
            'player_id' => 'required|string',
            'payment_method' => 'required|string'
        ]);

        // Ambil nominal dari paket
        $package = DB::table('topup_packages')
            ->where('id', $request->package_id)
            ->where('game_id', $request->game_id)
            ->first();

        if (!$package) {
            return response()->json(['message' => 'Paket top-up tidak valid'], 400);
        }

        // Simpan top-up ke database (tabel 'topups' harus ada)
        $topupId = DB::table('topups')->insertGetId([
            'user_id' => $request->user_id,
            'game_id' => $request->game_id,
            'package_id' => $request->package_id,
            'player_id' => $request->player_id,
            'amount' => $package->amount,
            'payment_method' => $request->payment_method,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json([
            'message' => 'Top-up berhasil',
            'topup_id' => $topupId,
            'amount' => $package->amount
        ]);
    }
}
