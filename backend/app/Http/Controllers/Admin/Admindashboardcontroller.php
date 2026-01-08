<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TopUp;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        /* =========================
         | KPI HARI INI (UANG)
         ========================= */
        $todayTransactionCount = Transaction::whereDate('created_at', today())
            ->where('status', 'success')
            ->count();

        $todayRevenue = Transaction::whereDate('created_at', today())
            ->where('status', 'success')
            ->sum('amount');

        /* =========================
         | STATUS TOPUP (OPERASIONAL)
         ========================= */
        $pendingCount = TopUp::where('status', 'pending')->count();
        $successCount = TopUp::where('status', 'success')->count();
        $failedCount  = TopUp::where('status', 'failed')->count();

        /* =========================
         | GRAFIK 7 HARI (REVENUE)
         ========================= */
        $last7Days = Transaction::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as total'),
                DB::raw('SUM(amount) as revenue')
            )
            ->where('status', 'success')
            ->where('created_at', '>=', now()->subDays(6))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        /* =========================
         | TRANSAKSI TERAKHIR (TOPUP)
         ========================= */
        $latestTopups = TopUp::latest()
            ->limit(5)
            ->get([
                'id',
                'topup_code',
                'player_id',
                'amount',
                'status',
                'created_at'
            ]);

        return response()->json([
            'kpi' => [
                'transactions_today' => $todayTransactionCount,
                'revenue_today'      => $todayRevenue,
            ],
            'status_summary' => [
                'pending' => $pendingCount,
                'success' => $successCount,
                'failed'  => $failedCount,
            ],
            'chart' => $last7Days,
            'latest_topups' => $latestTopups
        ]);
    }
}
