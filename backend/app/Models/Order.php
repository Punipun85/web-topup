<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'topup_id',
        'user_id',
        'payment_method',
        'amount',
        'status',
        'payment_payload',
        'payment_proof',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'float',
        'payment_payload' => 'array',
        'paid_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function topup()
    {
        return $this->belongsTo(Topup::class);
    }
}
