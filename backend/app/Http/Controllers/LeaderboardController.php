<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index()
    {
        $leaderboard = DB::table('transactions')
            ->join('topups', 'transactions.topup_id', '=', 'topups.id')
            ->join('users', 'topups.user_id', '=', 'users.id')
            ->select(
                'users.id',
                'users.name',
                DB::raw('SUM(transactions.amount) as total')
            )
            ->where('transactions.status', 'success')
            ->whereNotNull('topups.user_id')
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total')
            ->limit(10)
            ->get()
            ->values()
            ->map(function ($item, $index) {
                return [
                    'rank' => $index + 1,
                    'username' => $item->name,
                    'total' => (int) $item->total,
                ];
            });

        return response()->json($leaderboard);
    }
}
