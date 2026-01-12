<?php

namespace App\Http\Controllers;

use App\Models\Topup;
use App\Models\TopUpPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TopUpController extends Controller
{
    /**
     * Create business transaction (TOPUP)
     * Payment handled later via Order
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'game_id'    => 'required|exists:games,id',
            'package_id' => 'required|exists:topup_packages,id',
            'player_id'  => 'required|string',
            'server_id'  => 'nullable|string',
            'email'      => 'nullable|email',
        ]);

        // Validasi paket sesuai game
        $package = TopUpPackage::where('id', $data['package_id'])
            ->where('game_id', $data['game_id'])
            ->where('active', true)
            ->first();

        if (!$package) {
            return response()->json([
                'message' => 'Paket topup tidak valid'
            ], 400);
        }

        $topup = Topup::create([
            'topup_code' => 'TP-' . strtoupper(Str::random(10)),
            'user_id'    => Auth::id(), // null untuk guest
            'game_id'    => $data['game_id'],
            'package_id' => $package->id,
            'player_id'  => $data['player_id'],
            'server_id'  => $data['server_id'] ?? null,
            'email'      => $data['email'] ?? null,
            'amount'     => $package->price,
            'status'     => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Topup berhasil dibuat',
            'data' => [
                'id'         => $topup->id,
                'topup_code' => $topup->topup_code,
                'amount'     => $topup->amount,
                'status'     => $topup->status,
            ]
        ], 201);
    }
}
