<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:50',
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'whatsapp' => 'required|string|max:20',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return response()->json([
            'message' => 'Pesan berhasil dikirim'
        ], 201);
    }
}
