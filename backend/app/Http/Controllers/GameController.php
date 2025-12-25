<?php

namespace App\Http\Controllers;

use App\Models\Game;

class GameController extends Controller
{
    // HOME - daftar game
    public function index()
    {
        return response()->json(
            Game::where('active', true)->get()
        );
    }

    // DETAIL GAME + PRODUK (TopUp page)
    public function show($slug)
    {
        $game = Game::with('products')
            ->where('slug', $slug)
            ->where('active', true)
            ->firstOrFail();

        return response()->json($game);
    }
}
