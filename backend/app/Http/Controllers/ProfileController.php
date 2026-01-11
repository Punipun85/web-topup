<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * GET /api/profile
     * Ambil data profile user yang sedang login
     */
    public function show(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id'       => $user->id,
            'name'     => $user->name,
            'username' => $user->username,
            'email'    => $user->email,
            'phone'    => $user->phone,
            'role'     => $user->role,
            'avatar'   => $user->avatar,
            'created_at' => $user->created_at,
        ]);
    }

    /**
     * PUT /api/profile
     * Update data profile (nama & phone saja)
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
            'user' => [
                'name'  => $user->name,
                'phone' => $user->phone,
            ]
        ]);
    }

    /**
     * POST /api/profile/avatar
     * Upload / ganti foto profil
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = $request->user();

        // hapus avatar lama kalau ada
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');

        $user->avatar = $path;
        $user->save();

        return response()->json([
            'message' => 'Avatar updated successfully',
            'avatar'  => $path,
        ]);
    }

    /**
     * PUT /api/profile/password
     * Ganti password user
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
            'required',
            'email',
            Rule::unique('users')->ignore($request->user()->id),
        ],
        'password' => 'required',
    ]);

    $user = $request->user();

    // cek password
    if (!Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Password salah',
        ], 422);
    }

    // kalau email sama, tidak usah update
    if ($user->email === $request->email) {
        return response()->json([
            'message' => 'Email sama dengan sebelumnya',
        ], 200);
    }

    $user->email = $request->email;
    $user->email_verified_at = null; // reset verifikasi
    $user->save();

    return response()->json([
        'message' => 'Email updated successfully',
        'email'   => $user->email,
    ]);
}
}
