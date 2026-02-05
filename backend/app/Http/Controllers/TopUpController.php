<?php

namespace App\Http\Controllers;

use App\Models\Topup;
use App\Models\TopUpPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TopUpController extends Controller
{
    private function validateTopup(Request $request)
    {
        return $request->validate([
            'game_id'    => 'required|exists:games,id',
            'package_id' => 'required|exists:topup_packages,id',
            'player_id'  => [
            'required',
            'regex:/^[0-9]+$/',
            'max:20',
        ],

        'server_id'  => [
            'nullable',
            'regex:/^[0-9]+$/',
            'max:10',
        ],
            'email'      => 'nullable|email',
            'quantity'   => 'required|integer|min:1|max:100',
        ]);
    }

    private function resolvePackage(array $data)
    {
        return TopUpPackage::where('id', $data['package_id'])
            ->where('game_id', $data['game_id'])
            ->where('active', true)
            ->firstOrFail();
    }

    /**
     * =========================
     * TOPUP GUEST
     * =========================
     */
    public function storeGuest(Request $request)
    {
        $data = $this->validateTopup($request);
        $package = $this->resolvePackage($data);

        $quantity = $data['quantity'];
        $totalAmount = $package->price * $quantity;

        $topup = Topup::create([
            'topup_code' => 'TP-' . strtoupper(Str::random(10)),
            'user_id'    => null,
            'game_id'    => $data['game_id'],
            'package_id' => $package->id,
            'player_id'  => $data['player_id'],
            'server_id'  => $data['server_id'] ?? null,
            'email'      => $data['email'] ?? null,
            'amount'     => $totalAmount,
            'status'     => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'type'    => 'guest',
            'data'    => $topup,
        ], 201);
    }

    /**
     * =========================
     * TOPUP AUTH
     * =========================
     */
    public function storeAuth(Request $request)
    {
        $data = $this->validateTopup($request);
        $package = $this->resolvePackage($data);

        $quantity = $data['quantity'];
        $totalAmount = $package->price * $quantity;

        $topup = Topup::create([
            'topup_code' => 'TP-' . strtoupper(Str::random(10)),
            'user_id'    => Auth::id(),
            'game_id'    => $data['game_id'],
            'package_id' => $package->id,
            'player_id'  => $data['player_id'],
            'server_id'  => $data['server_id'] ?? null,
            'email'      => Auth::user()->email,
            'amount'     => $totalAmount,
            'status'     => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'type'    => 'auth',
            'data'    => $topup,
        ], 201);
    }
}
