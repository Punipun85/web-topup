<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Topup;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today(); // bisa disesuaikan timezone

        $stats = Topup::select(
                DB::raw("SUM(status = 'pending') as pending"),
                DB::raw("SUM(status = 'success') as success"),
                DB::raw("SUM(status = 'failed') as failed")
            )
            ->first();

        $todayTotal = Topup::where('status', 'success')
            ->whereDate('created_at', $today)
            ->sum('amount');

        return response()->json([
            'pending'      => (int) $stats->pending,
            'success'      => (int) $stats->success,
            'failed'       => (int) $stats->failed,
            'today_total'  => (int) $todayTotal,
        ]);
    }
}
