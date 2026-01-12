<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topup extends Model
{
    use HasFactory;

    protected $fillable = [
    'topup_code',
    'user_id',
    'game_id',
    'package_id',
    'player_id',
    'server_id',
    'email',
    'amount',
    'status'
];


    protected $casts = [
        'amount' => 'integer'
    ];

    /**
     * Topup berasal dari satu order
     */
    public function order()
    {
        return $this->hasOne(Order::class);
    }

    /**
     * User pemilik topup
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Game yang di-topup
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Paket topup
     */
    public function package()
    {
        return $this->belongsTo(TopUpPackage::class, 'package_id');
    }

    /**
     * Ledger / history transaksi
     */
    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }
}
