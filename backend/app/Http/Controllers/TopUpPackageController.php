<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Game;

class TopUpPackageController extends Controller
{
    /**
     * Ambil detail game + paket topup (publik)
     */
    public function show($slug)
    {
        $game = Game::with(['products' => function ($q) {
            $q->where('active', true);
        }])->where('slug', $slug)
          ->where('active', true)
          ->firstOrFail();

        return response()->json([
            'id' => $game->id,
            'name' => $game->name,
            'slug' => $game->slug,
            'image' => $game->image,
            'packages' => $game->products->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'amount' => $p->amount,
                    'price' => $p->price,
                    'promo' => $p->active_promo, // accessor
                ];
            })
        ]);
    }
}
