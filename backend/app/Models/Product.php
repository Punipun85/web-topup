<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $table = 'topup_packages';

    protected $fillable = [
        'game_id',
        'name',     
        'amount',   
        'price',    
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

    // --- TAMBAHAN PENTING (Agar Controller tidak error) ---
    // Ini namanya "Accessor". Laravel otomatis memanggil ini saat Anda tulis $product->active_promo
    public function getActivePromoAttribute()
    {
        // Cek apakah di dalam kolom meta ada key 'promo'
        if (isset($this->meta['promo'])) {
            return $this->meta['promo'];
        }
        return null;
    }
}