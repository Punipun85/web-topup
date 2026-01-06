<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class AdminGameController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Game::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'   => 'required|string',
            'slug'   => 'required|string|unique:games,slug',
            'code'   => 'required|string|unique:games,code',
            'active' => 'boolean',
        ]);

        $game = Game::create($data);

        return response()->json($game, 201);
    }

    public function update(Request $request, Game $game)
    {
        $data = $request->validate([
            'name'   => 'required|string',
            'slug'   => 'required|string|unique:games,slug,' . $game->id,
            'code'   => 'required|string|unique:games,code,' . $game->id,
            'active' => 'boolean',
        ]);

        $game->update($data);

        return response()->json($game);
    }

    public function destroy(Game $game)
    {
        $game->delete();

        return response()->json([
            'message' => 'Game deleted'
        ]);
    }
}
