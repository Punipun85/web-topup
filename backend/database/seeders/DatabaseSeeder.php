<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\GamesSeeder;
use Database\Seeders\UsersSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
        GamesSeeder::class,
        UsersSeeder::class,
        PaymentMethodSeeder::class,
    ]);
        // User::factory(10)->create();

    }
}
