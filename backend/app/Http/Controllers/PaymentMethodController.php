<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentMethod;

class PaymentMethodController extends Controller
{
    public function index()
    {
        // Ambil data pembayaran yang aktif
        $payments = PaymentMethod::where('is_active', true)->get();
        return response()->json($payments);
    }
}