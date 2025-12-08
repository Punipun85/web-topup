<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
