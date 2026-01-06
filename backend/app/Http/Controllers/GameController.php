<?php

namespace App\Http\Controllers;

use App\Models\Game;

class GameController extends Controller
{
    // HOME - daftar game
    public function index()
    {
        $games = Game::where('active', true)->get()
            ->map(function ($game) {
                $game->image_url = $game->image
                    ? asset('uploads/games/' . $game->image)
                    : null;

                return $game;
            });

        return response()->json($games);
    }

    // DETAIL GAME + PRODUK (TopUp page)
    public function show($slug)
    {
        $game = Game::with('products')
            ->where('slug', $slug)
            ->where('active', true)
            ->firstOrFail();

        // tambahkan image url juga di sini
        $game->image_url = $game->image
            ? asset('uploads/games/' . $game->image)
            : null;

        return response()->json($game);
    }
}
