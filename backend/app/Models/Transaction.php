<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'email',
        'game_user_id',
        'zone_id',
        'game',
        'item_name',
        'amount',
        'total_price',
        'payment_method',
        'status',
        'user_id'
    ];
}