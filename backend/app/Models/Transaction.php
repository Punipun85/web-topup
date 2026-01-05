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
        'amount',       // <--- PASTIKAN INI ADA
        'price',        // <--- PASTIKAN INI ADA (Ini penyebab error Anda)
        'quantity',     // <--- PASTIKAN INI ADA
        'total_price',  // <--- PASTIKAN INI ADA
        'payment_method',
        'status',
        'snap_token'
    ];
}