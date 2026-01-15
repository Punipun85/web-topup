<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
// ✅ TAMBAHKAN MODEL TRANSACTION
use App\Models\Transaction; 

class ProfileController extends Controller
{
    /**
     * GET /api/user/profile
     */
    public function show(Request $request)
    {
        $user = $request->user();

        // ✅ PERBAIKAN: Bungkus dengan 'data' agar terbaca di React (res.data.data)
        return response()->json([
            'data' => [
                'id'       => $user->id,
                'name'     => $user->name,
                'username' => $user->username,
                'email'    => $user->email,
                'phone'    => $user->phone,
                'role'     => $user->role, // Pastikan kolom ini ada di DB user
                'avatar'   => $user->avatar,
                'created_at' => $user->created_at,
            ]
        ]);
    }

    /**
     * GET /api/user/stats
     * ✅ FUNGSI BARU: Untuk mengisi kotak statistik & Level di Dashboard
     */
    public function stats(Request $request)
    {
        $userId = $request->user()->id;

        // Query Builder untuk performa lebih cepat
        $query = Transaction::where('user_id', $userId);

        $stats = [
            'total_trx'   => $query->count(),
            // Pastikan kolom harga di DB namanya 'amount' atau 'price' (sesuaikan di sini)
            'total_sales' => $query->where('status', 'Success')->sum('amount'), 
            'pending'     => $query->where('status', 'Pending')->count(),
            'process'     => $query->whereIn('status', ['Processing', 'Process'])->count(),
            'success'     => $query->where('status', 'Success')->count(),
            'failed'      => $query->whereIn('status', ['Failed', 'Canceled'])->count(),
        ];

        return response()->json([
            'data' => $stats
        ]);
    }

    /**
     * PUT /api/user/profile
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => [ // Konsisten pakai wrapper 'data'
                'name'  => $user->name,
                'phone' => $user->phone,
            ]
        ]);
    }

    /**
     * POST /api/user/profile/avatar
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = $request->user();

        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');

        $user->avatar = $path;
        $user->save();

        return response()->json([
            'message' => 'Avatar updated successfully',
            'data' => ['avatar' => $path]
        ]);
    }

    /**
     * PUT /api/user/profile/password
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Password lama salah',
            ], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }

    public function updateEmail(Request $request)
    {
        $request->validate([
            'email' => [
                'required', 'email', Rule::unique('users')->ignore($request->user()->id),
            ],
            'password' => 'required',
        ]);

        $user = $request->user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Password salah'], 422);
        }

        if ($user->email === $request->email) {
            return response()->json(['message' => 'Email sama dengan sebelumnya'], 200);
        }

        $user->email = $request->email;
        $user->email_verified_at = null;
        $user->save();

        return response()->json([
            'message' => 'Email updated successfully',
            'data'    => ['email' => $user->email],
        ]);
    }
}