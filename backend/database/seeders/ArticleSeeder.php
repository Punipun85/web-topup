<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // WAJIB ADA INI

class ArticleSeeder extends Seeder
{
    public function run()
    {
        // Hapus data lama agar tidak duplikat saat di-seed ulang
        DB::table('articles')->truncate();

        $articles = [
            [
                'title' => 'Build Fredrinn Tersakit! Musuh Auto Kena Mental',
                'slug' => 'build-fredrinn-tersakit',
                'category' => 'MINTIME',
                'image' => '/images/fredrinn.png', // Pastikan file gambar ada di folder public/images React
                'content' => '
                    <p>Fredrinn adalah hero Tank/Fighter yang sangat kuat saat ini. Kuncinya adalah menjaga stack Crystal Energy.</p>
                    <h3>Rekomendasi Item:</h3>
                    <ul>
                        <li>Guardian Helmet</li>
                        <li>Cursed Helmet</li>
                        <li>Antique Cuirass</li>
                    </ul>
                ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Build leomord Tersakit! Musuh ketar ketir',
                'slug' => 'build-leomord-tersakit',
                'category' => 'NEWS',
                'image' => '/images/leomord.png',
                'content' => '
                    <p>Moonton merilis update terbaru. Hero Leomord mendapatkan Buff besar, sementara Wanwan terkena Nerf.</p>
                ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'build badang tebel',
                'slug' => 'build-badang',
                'category' => 'TIPS',
                'image' => '/images/Badang.png',
                'content' => '
                    <p>Ingin naik ke Mythic sendirian? Kuncinya adalah penguasaan map dan objektif gaming.</p>
                ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('articles')->insert($articles);
    }
}