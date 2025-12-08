<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'product_id',
        'player_id',
        'amount',
        'status',
        'payment_payload'
    ];

    protected $casts = [
        'amount' => 'float',
        'payment_payload' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }
}
