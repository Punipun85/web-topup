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
        'game_name',
        'package_name',
        'amount',
        'price',
        'payment_method',
        'payer_email',
        'status',
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
