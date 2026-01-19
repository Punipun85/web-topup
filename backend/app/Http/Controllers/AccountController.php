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
        return Transaction::query()
        ->join('topups', 'transactions.topup_id', '=', 'topups.id')
        ->where('topups.user_id', $request->user()->id)
        ->where('transactions.status', 'success')
        ->select(
            'transactions.amount',
            'transactions.status',
            'transactions.created_at'
        )
        ->latest('transactions.created_at')
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
