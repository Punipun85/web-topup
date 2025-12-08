<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_id',
        'sku',
        'name',
        'price',
        'meta',
        'stock',
        'active'
    ];

    protected $casts = [
        'price' => 'float',
        'meta'  => 'array',
        'active'=> 'boolean'
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
