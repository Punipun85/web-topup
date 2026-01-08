<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TopUp;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class AdminTopUpController extends Controller
{
    /**
     * List transaksi topup (dengan filter)
     */
    public function index(Request $request)
    {
        $query = TopUp::query();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where('invoice', 'like', '%' . $request->search . '%');
        }

        return response()->json(
            $query->latest()->paginate(20)
        );
    }

    /**
     * Detail transaksi
     */
    public function show($id)
    {
        $topup = TopUp::findOrFail($id);
        return response()->json($topup);
    }

    /**
     * Approve topup manual
     */
    public function approve(Request $request, $id)
    {
        $request->validate([
            'admin_note' => 'nullable|string|max:255'
        ]);

        $topup = TopUp::findOrFail($id);

        if ($topup->status !== 'pending') {
            return response()->json([
                'message' => 'Topup sudah diproses'
            ], 422);
        }

        $topup->update([
            'status'       => 'success',
            'approved_by'  => Auth::id(),
            'approved_at'  => now(),
            'admin_note'   => $request->admin_note
        ]);

        ActivityLog::create([
            'admin_id' => Auth::id(),
            'action'   => 'APPROVE_TOPUP',
            'payload'  => json_encode([
                'topup_id' => $topup->id,
                'invoice'  => $topup->invoice
            ])
        ]);

        return response()->json([
            'message' => 'Topup berhasil di-approve'
        ]);
    }

    /**
     * Tandai topup gagal
     */
    public function fail(Request $request, $id)
    {
        $request->validate([
            'admin_note' => 'required|string|max:255'
        ]);

        $topup = TopUp::findOrFail($id);

        if ($topup->status !== 'pending') {
            return response()->json([
                'message' => 'Topup sudah diproses'
            ], 422);
        }

        $topup->update([
            'status'       => 'failed',
            'approved_by'  => Auth::id(),
            'approved_at'  => now(),
            'admin_note'   => $request->admin_note
        ]);

        ActivityLog::create([
            'admin_id' => Auth::id(),
            'action'   => 'FAIL_TOPUP',
            'payload'  => json_encode([
                'topup_id' => $topup->id,
                'invoice'  => $topup->invoice,
                'amount'   => $topup->amount
            ])
        ]);

        return response()->json([
            'message' => 'Topup ditandai gagal'
        ]);
    }
}
