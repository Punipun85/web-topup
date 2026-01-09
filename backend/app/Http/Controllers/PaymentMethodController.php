<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;

class PaymentMethodController extends Controller
{
    public function index()
    {
        $payments = PaymentMethod::query()
            ->where('is_active', true)
            ->orderBy('name') // opsional, tapi berguna
            ->get([
                'id',
                'name',
                'code',
                'category',
                'image',
                'admin_fee'
            ]);

        return response()->json([
            'data' => $payments
        ]);
    }
}
