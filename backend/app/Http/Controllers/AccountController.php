<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class AccountController extends Controller
{
    public function transactions(Request $request)
    {
        return Transaction::where('user_id', $request->user()->id)
            ->latest()
            ->get();
    }

    public function mutations(Request $request)
    {
        return Transaction::where('user_id', $request->user()->id)
            ->where('status', 'success')
            ->select('amount', 'status', 'created_at')
            ->latest()
            ->get();
    }

    public function affiliates(Request $request)
    {
        return response()->json([
            'referral_code' => 'REF-' . $request->user()->id,
            'total_referral' => 0,
            'total_commission' => 0
        ]);
    }

    public function settings(Request $request)
    {
        return response()->json([
            'dark_mode' => true,
            'email_notification' => true
        ]);
    }
}
