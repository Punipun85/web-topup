<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /**
     * List activity log (dengan filter)
     */
    public function index(Request $request)
    {
        $query = ActivityLog::with('admin:id,name,email');

        // filter by action
        if ($request->action) {
            $query->where('action', $request->action);
        }

        // filter by admin
        if ($request->admin_id) {
            $query->where('admin_id', $request->admin_id);
        }

        // search payload (invoice, id, dll)
        if ($request->search) {
            $query->where('payload', 'like', '%' . $request->search . '%');
        }

        return response()->json(
            $query->latest()->paginate(20)
        );
    }

    /**
     * Detail satu activity log
     */
    public function show($id)
    {
        $log = ActivityLog::with('admin:id,name,email')->findOrFail($id);
        return response()->json($log);
    }
}
