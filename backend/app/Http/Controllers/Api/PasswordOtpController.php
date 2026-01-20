<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
use App\Models\User;

class PasswordOtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => ['required','email'],
        ]);

        // Optional: Jangan bocorin apakah email terdaftar
        // Tetap balikin message sukses walau user tidak ada
        $email = strtolower($request->email);

        // Rate limit sederhana (opsional lebih bagus pakai throttle middleware)
        $recent = DB::table('password_reset_otps')
            ->where('email', $email)
            ->where('created_at', '>=', now()->subMinutes(2))
            ->count();

        if ($recent > 0) {
            return response()->json(['message' => 'Tunggu sebentar sebelum minta OTP lagi.'], 429);
        }

        $otp = (string) random_int(100000, 999999);

        DB::table('password_reset_otps')->insert([
            'email' => $email,
            'otp_hash' => Hash::make($otp),
            'expires_at' => now()->addMinutes(10),
            'used_at' => null,
            'attempts' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Kirim email OTP (paling simpel pakai Mail::raw)
        Mail::raw("Kode OTP reset password kamu: {$otp}\nBerlaku 10 menit.", function ($m) use ($email) {
            $m->to($email)->subject('OTP Reset Password');
        });

        // Jangan pernah return OTP di response (buat testing boleh tapi jangan produksi)
        return response()->json(['message' => 'OTP sudah dikirim ke email (jika terdaftar).']);
    }

    public function verifyAndReset(Request $request)
    {
        $request->validate([
            'email' => ['required','email'],
            'otp' => ['required','digits:6'],
            'password' => ['required','min:8','confirmed'],
        ]);

        $email = strtolower($request->email);

        // Ambil OTP terbaru yang belum dipakai dan belum expired
        $row = DB::table('password_reset_otps')
            ->where('email', $email)
            ->whereNull('used_at')
            ->orderByDesc('id')
            ->first();

        if (!$row) {
            return response()->json(['message' => 'OTP tidak ditemukan atau sudah dipakai.'], 422);
        }

        if (Carbon::parse($row->expires_at)->isPast()) {
            return response()->json(['message' => 'OTP sudah kadaluarsa.'], 422);
        }

        // Batasi percobaan
        if ($row->attempts >= 5) {
            return response()->json(['message' => 'Terlalu banyak percobaan. Minta OTP baru.'], 429);
        }

        $ok = Hash::check($request->otp, $row->otp_hash);

        // Update attempts
        DB::table('password_reset_otps')->where('id', $row->id)->update([
            'attempts' => $row->attempts + 1,
            'updated_at' => now(),
        ]);

        if (!$ok) {
            return response()->json(['message' => 'OTP salah.'], 422);
        }

        $user = User::where('email', $email)->first();

        // Tetap jangan bocorin detail akun
        if (!$user) {
            // Mark used supaya OTP tidak bisa dicoba ulang untuk enumerasi
            DB::table('password_reset_otps')->where('id', $row->id)->update([
                'used_at' => now(),
                'updated_at' => now(),
            ]);
            return response()->json(['message' => 'Berhasil. Silakan login.']);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Mark OTP used
        DB::table('password_reset_otps')->where('id', $row->id)->update([
            'used_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Password berhasil direset. Silakan login.']);
    }
}
