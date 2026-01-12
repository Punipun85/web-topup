<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class TopUpPackage extends Model
{
    protected $table = 'topup_packages';

    protected $fillable = [
        'price',
        'promo_enabled',
        'meta',
        'active'
    ];

    protected $casts = [
        'meta' => 'array',
        'promo_enabled' => 'boolean',
        'active' => 'boolean',
    ];

    /**
     * RELASI KE GAME (INI YANG KURANG)
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Promo yang benar-benar aktif
     */
    public function getActivePromoAttribute()
    {
        if (!$this->promo_enabled) {
            return null;
        }

        $promo = $this->meta['promo'] ?? null;
        if (!$promo) return null;

        $now = Carbon::now();

        if (
            isset($promo['starts_at'], $promo['ends_at']) &&
            $now->between(
                Carbon::parse($promo['starts_at']),
                Carbon::parse($promo['ends_at'])
            )
        ) {
            return $promo;
        }

        return null;
    }
}
    