<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\TopUpPackage;

class GamesSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Data games
        $gamesData = [
            [
                'code' => 'ML',
                'name' => 'Mobile Legends',
                'slug' => 'mobile-legends',
            ],
            [
                'code' => 'FF',
                'name' => 'Free Fire',
                'slug' => 'free-fire',
            ],
            [
                'code' => 'PUBG',
                'name' => 'PUBG Mobile',
                'slug' => 'pubg-mobile',
            ],
            [
                'code' => 'GI',
                'name' => 'Genshin Impact',
                'slug' => 'genshin-impact',
            ],
        ];

        $gameIds = [];

        foreach ($gamesData as $gameData) {
            // firstOrCreate = cek dulu berdasarkan slug
            $game = Game::firstOrCreate(
                ['slug' => $gameData['slug']],
                [
                    'code' => $gameData['code'],
                    'name' => $gameData['name'],
                    'active' => true,
                ]
            );

            $gameIds[$game->slug] = $game->id;
        }

        // 2. Data topup packages
        $packagesData = [
            // Mobile Legends
            ['slug' => 'mobile-legends', 'name' => '12 Diamonds', 'amount' => 12],
            ['slug' => 'mobile-legends', 'name' => '50 Diamonds', 'amount' => 50],
            // Free Fire
            ['slug' => 'free-fire', 'name' => '50 Diamonds', 'amount' => 50],
            ['slug' => 'free-fire', 'name' => '100 Diamonds', 'amount' => 100],
            // PUBG Mobile
            ['slug' => 'pubg-mobile', 'name' => '100 UC', 'amount' => 100],
            ['slug' => 'pubg-mobile', 'name' => '500 UC', 'amount' => 500],
            // Genshin Impact
            ['slug' => 'genshin-impact', 'name' => '60 Genesis Crystals', 'amount' => 60],
            ['slug' => 'genshin-impact', 'name' => '300 Genesis Crystals', 'amount' => 300],
        ];

        foreach ($packagesData as $pkg) {
            $game_id = $gameIds[$pkg['slug']];

            TopUpPackage::firstOrCreate(
                ['game_id' => $game_id, 'name' => $pkg['name']],
                ['amount' => $pkg['amount']]
            );
        }
    }
}
