<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class TopUpController extends Controller
{
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'game_id' => 'required|exists:games,id',
                'package_id' => 'required|exists:topup_packages,id',
                'player_id' => 'required|string',
                'server_id' => 'nullable|string',
                'email' => 'nullable|email',
                'payment_method' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors()
            ], 422);
        }

        $package = DB::table('topup_packages')
            ->where('id', $data['package_id'])
            ->where('game_id', $data['game_id'])
            ->first();

        if (!$package) {
            return response()->json([
                'status' => 'error',
                'message' => 'Paket top-up tidak valid'
            ], 400);
        }

        $topupId = DB::table('topups')->insertGetId([
            'user_id' => Auth::id(), // NULL untuk guest
            'game_id' => $data['game_id'],
            'package_id' => $data['package_id'],
            'player_id' => $data['player_id'],
            'server_id' => $data['server_id'] ?? null,
            'email' => $data['email'] ?? null,
            'amount' => $package->amount,
            'payment_method' => $data['payment_method'],
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
        'success' => true,
        'message' => 'Top-up berhasil dibuat, menunggu pembayaran',
        'data' => [
        'topup_id' => $topupId,
        'status' => 'pending',
        'amount' => $package->amount,
        'payment_method' => $data['payment_method']
        ]
        ], 201);
    }
}
