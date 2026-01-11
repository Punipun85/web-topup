<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'topup_id',
        'invoice_id',
        'amount',
        'payment_method',
        'status',        // success | failed
        'finalized_at',
    ];

    protected $casts = [
        'amount' => 'integer',
        'finalized_at' => 'datetime',
    ];

    /**
     * Transaction selalu milik satu topup
     */
    public function topup()
    {
        return $this->belongsTo(\App\Models\Topup::class);
    }

    public function user()
    {
        return $this->topup->user();
    }
}

    
