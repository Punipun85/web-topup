<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        // Ceritanya ini data dari Database (nanti kita ganti pakai Model Transaction)
        $dataSultan = [
            [
                'rank' => 1,
                'username' => 'Raja_Jawa',
                'total' => 15500000
            ],
            [
                'rank' => 2,
                'username' => 'pria solo',
                'total' => 9800000
            ],
            [
                'rank' => 3,
                'username' => 'buna teddy',
                'total' => 5200000
            ],
            [
                'rank' => 4,
                'username' => 'AkuSiapa',
                'total' => 3100000
            ],
            [
                'rank' => 5,
                'username' => 'User1231',
                'total' => 2500000
            ],
            [
                'rank' => 6,
                'username' => 'TopUp_Murah',
                'total' => 1800000
            ],
            [
                'rank' => 7,
                'username' => 'Gacha_Ampas',
                'total' => 900000
            ],
        ];

        return response()->json($dataSultan);
    }
}