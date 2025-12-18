<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopUpPackage extends Model
{
    use HasFactory;

    protected $table = 'topup_packages';

    protected $fillable = [
        'game_id',
        'name',
        'amount',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
