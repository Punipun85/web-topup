<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class AdminContactController extends Controller
{
    public function index()
    {
        return ContactMessage::latest()->get();
    }

    public function show($id)
    {
        return ContactMessage::findOrFail($id);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:new,read,resolved'
        ]);

        $msg = ContactMessage::findOrFail($id);
        $msg->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status diperbarui'
        ]);
    }
}
