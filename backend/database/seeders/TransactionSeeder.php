<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    public function run()
    {
        // 1. Buat 10 User Palsu
        for ($i = 1; $i <= 10; $i++) {
            $userId = DB::table('users')->insertGetId([
                'name' => 'Sultan_' . Str::random(5),
                'email' => 'user'.$i.'@example.com',
                'password' => Hash::make('password'),
            ]);

            // 2. Buat Transaksi untuk user tersebut (Random 1 - 5 juta)
            DB::table('transactions')->insert([
                'user_id' => $userId,
                'game' => 'mobile-legends',
                'item_name' => 'Diamond Pack',
                'amount' => rand(100000, 5000000), // Random nominal
                'status' => 'PAID', // Penting! Status harus PAID biar muncul di leaderboard
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}