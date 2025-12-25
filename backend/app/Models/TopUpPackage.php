<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class TopUpPackage extends Model
{
    protected $casts = [
        'meta' => 'array',
    ];

     protected $table = 'topup_packages';

    public function getActivePromoAttribute()
    {
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
