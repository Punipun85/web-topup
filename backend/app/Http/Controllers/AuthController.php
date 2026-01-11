<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register user baru (role default = user)
     */
    public function register(Request $r)
    {
        $v = Validator::make($r->all(), [
            'name' => 'required|string|max:100',
            'username' => 'required|string|max:50|unique:users,username',
            'email' => 'required|email|max:100|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json($v->errors(), 422);
        }

        $user = User::create([
            'name' => $r->name,
            'username' => $r->username,
            'email' => $r->email,
            'phone' => $r->phone,
            'password' => Hash::make($r->password),
            'role' => 'user',
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
            ]
        ], 201);
    }

    /**
     * Login user (email atau username)
     */
    public function login(Request $r)
    {
        $r->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        // cari user by email ATAU username
        $user = User::where('email', $r->login)
            ->orWhere('username', $r->login)
            ->first();

        if (!$user || !Hash::check($r->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // hapus token lama
        $user->tokens()->delete();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token
        ]);
    }

    /**
     * Info user saat ini
     */
    public function me(Request $r)
    {
        return response()->json($r->user());
    }

    /**
     * Logout user
     */
    public function logout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}
