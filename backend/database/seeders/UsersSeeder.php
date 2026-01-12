<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'phone' => '081234567890',
                'password' => Hash::make('admin1234'),
                'role' => 'admin',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Moderator',
                'username' => 'moderator',
                'email' => 'moderator@gmail.com',
                'phone' => '081234567891',
                'password' => Hash::make('moderator123'),
                'role' => 'moderator',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Budi',
                'username' => 'budi',
                'email' => 'budi@gmail.com',
                'phone' => '081234567892',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Siti',
                'username' => 'siti',
                'email' => 'siti@example.com',
                'phone' => '081234567893',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'EL',
                'username' => 'el',
                'email' => 'el@gmail.com',
                'phone' => '081234567894',
                'password' => Hash::make('12345678'),
                'role' => 'user',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
