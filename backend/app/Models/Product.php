<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    // Arahkan ke tabel yang benar
    protected $table = 'topup_packages';

    // Sesuaikan dengan Migration yang Anda kirim sebelumnya
    protected $fillable = [
        'game_id',
        'name',     // contoh: "100 Diamonds"
        'amount',   // PENTING: jumlah diamond (ada di migration)
        'price',    // Harga
        'meta',
        'active'
    ];

    protected $casts = [
        'price' => 'float',
        'amount'=> 'integer',
        'meta'  => 'array',
        'active'=> 'boolean'
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}