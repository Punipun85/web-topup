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
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin1234'),
                'role' => 'admin',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Moderator',
                'email' => 'moderator@gmail.com',
                'password' => Hash::make('mod123'),
                'role' => 'moderator',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Budi',
                'email' => 'budi@gmail.com',
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
            [
                'name' => 'rama',
                'email' => 'ram@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'user',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
