<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Topup;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminTopUpController extends Controller
{
    /**
     * List topup (delivery queue)
     */
    public function index(Request $request)
    {
        $query = Topup::with(['order', 'user', 'game', 'package']);

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where('topup_code', 'like', '%' . $request->search . '%');
        }

        return response()->json(
            $query->latest()->paginate(20)
        );
    }

    /**
     * Detail topup
     */
    public function show($id)
    {
        $topup = Topup::with(['order', 'user', 'game', 'package'])
            ->findOrFail($id);

        return response()->json($topup);
    }

    /**
     * Tandai topup SUCCESS (delivery berhasil)
     */
    public function success($id)
    {
        return DB::transaction(function () use ($id) {

            $topup = Topup::lockForUpdate()->findOrFail($id);

            if ($topup->status !== 'pending') {
                return response()->json([
                    'message' => 'Topup sudah diproses'
                ], 422);
            }

            // 1️⃣ update topup
            $topup->update([
                'status' => 'success',
            ]);

            // 2️⃣ create transaction ledger (ONCE)
            Transaction::firstOrCreate(
                [
                    'topup_id' => $topup->id,
                ],
                [
                    'invoice_id'     => 'INV-' . strtoupper(Str::random(12)),
                    'amount'         => $topup->amount,
                    'payment_method' => $topup->order->payment_method,
                    'status'         => 'success',
                    'finalized_at'   => now(),
                ]
            );

            return response()->json([
                'message' => 'Topup berhasil diselesaikan'
            ]);
        });
    }

    /**
     * Tandai topup FAILED (delivery gagal)
     */
    public function fail(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string|max:255'
        ]);

        $topup = Topup::findOrFail($id);

        if ($topup->status !== 'pending') {
            return response()->json([
                'message' => 'Topup sudah diproses'
            ], 422);
        }

        $topup->update([
            'status' => 'failed',
        ]);

        return response()->json([
            'message' => 'Topup ditandai gagal',
            'reason'  => $request->reason
        ]);
    }
}
