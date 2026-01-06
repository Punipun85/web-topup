<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'topup_id',
        'invoice_id',
        'email',
        'payer_email', // Masukkan keduanya agar aman
        'game_user_id',
        'zone_id',
        'game',
        'game_name',
        'item_name',
        'package_name',
        'amount',
        'price',
        'quantity',
        'total_price',
        'payment_method',
        'status',
        'snap_token',
        'finalized_at',
    ];

    protected $casts = [
        'finalized_at' => 'datetime',
    ];

    public function topup()
    {
        return $this->belongsTo(Topup::class);
    }
}