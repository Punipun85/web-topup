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
            [
                'code' => 'VAL',
                'name' => 'Valorant',
                'slug' => 'valorant',
            ],
            [
                'code' => 'HOK',
                'name' => 'Honor of Kings',
                'slug' => 'honor-of-kings',
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

            // =========================
            // Mobile Legends
            // =========================
            ['slug' => 'mobile-legends', 'name' => '12 Diamonds',  'amount' => 12,  'price' => 10000],
            ['slug' => 'mobile-legends', 'name' => '50 Diamonds',  'amount' => 50,  'price' => 20000],
            ['slug' => 'mobile-legends', 'name' => '86 Diamonds',  'amount' => 86,  'price' => 30000],
            ['slug' => 'mobile-legends', 'name' => '172 Diamonds', 'amount' => 172, 'price' => 60000],
            ['slug' => 'mobile-legends', 'name' => '257 Diamonds', 'amount' => 257, 'price' => 90000],

            // =========================
            // Free Fire
            // =========================
            ['slug' => 'free-fire', 'name' => '50 Diamonds',  'amount' => 50,  'price' => 10000],
            ['slug' => 'free-fire', 'name' => '70 Diamonds',  'amount' => 70,  'price' => 15000],
            ['slug' => 'free-fire', 'name' => '140 Diamonds', 'amount' => 140, 'price' => 30000],
            ['slug' => 'free-fire', 'name' => '355 Diamonds', 'amount' => 355, 'price' => 75000],

            // =========================
            // PUBG Mobile
            // =========================
            ['slug' => 'pubg-mobile', 'name' => '60 UC',  'amount' => 60,  'price' => 15000],
            ['slug' => 'pubg-mobile', 'name' => '300 UC', 'amount' => 300, 'price' => 70000],
            ['slug' => 'pubg-mobile', 'name' => '600 UC', 'amount' => 600, 'price' => 130000],

            // =========================
            // Genshin Impact
            // =========================
            ['slug' => 'genshin-impact', 'name' => '60 Genesis Crystals',  'amount' => 60,  'price' => 15000],
            ['slug' => 'genshin-impact', 'name' => '300 Genesis Crystals', 'amount' => 300, 'price' => 75000],
            ['slug' => 'genshin-impact', 'name' => '980 Genesis Crystals', 'amount' => 980, 'price' => 240000],

            // =========================
            // Valorant
            // =========================
            ['slug' => 'valorant', 'name' => '125 VP', 'amount' => 125, 'price' => 15000],
            ['slug' => 'valorant', 'name' => '420 VP', 'amount' => 420, 'price' => 50000],
            ['slug' => 'valorant', 'name' => '700 VP', 'amount' => 700, 'price' => 80000],

            // =========================
            // Honor of Kings
            // =========================
            ['slug' => 'honor-of-kings', 'name' => '50 Tokens',  'amount' => 50,  'price' => 12000],
            ['slug' => 'honor-of-kings', 'name' => '100 Tokens', 'amount' => 100, 'price' => 22000],
            ['slug' => 'honor-of-kings', 'name' => '300 Tokens', 'amount' => 300, 'price' => 60000],

        ];

        foreach ($packagesData as $pkg) {
            $game_id = $gameIds[$pkg['slug']];

            TopUpPackage::firstOrCreate(
        [
        'game_id' => $game_id,
        'name' => $pkg['name'],
        ],
        [
        'amount' => $pkg['amount'],
        'price' => $pkg['price'],
        'active' => true,
        'meta' => [ // tambahan semisal akan ada promo (untuk sekarang diberi bonus diamonds dulu)
            'promo' => [
                'label' => 'Bonus Diamonds',
                'bonus_amount' => intval($pkg['amount'] * 0.5),
            ],
            'ui' => [
                'badge' => '💎',
                'highlight' => true,
                ]
            ]
        ]
    );
        }
    }
}
