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
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Moderator',
                'email' => 'moderator@example.com',
                'password' => Hash::make('mod123'),
                'role' => 'moderator',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Budi',
                'email' => 'budi@example.com',
                'password' => Hash::make('123456'),
                'role' => 'user',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Siti',
                'email' => 'siti@example.com',
                'password' => Hash::make('123456'),
                'role' => 'user',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
