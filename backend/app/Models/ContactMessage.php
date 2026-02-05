<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'category',
        'name',
        'email',
        'whatsapp',
        'message',
        'status',
    ];
}
