<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topup extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_id',
        'package_id',
        'player_id',
        'server_id',
        'email',
        'amount',
        'payment_method',
        'status'
    ];

    protected $casts = [
        'amount' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function package()
    {
        return $this->belongsTo(TopUpPackage::class, 'package_id');
    }
}
