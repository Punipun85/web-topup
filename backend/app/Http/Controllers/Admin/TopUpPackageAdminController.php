<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TopUpPackage;

class TopUpPackageAdminController extends Controller
{
    /**
     * Update harga + promo
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'price' => 'required|integer|min:0',
            'promo_label' => 'nullable|string',
            'bonus' => 'nullable|integer|min:0',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after:starts_at',
        ]);

        $package = TopUpPackage::findOrFail($id);

        $meta = $package->meta ?? [];

        // Kalau promo diisi
        if ($request->promo_label) {
            $meta['promo'] = [
                'label' => $request->promo_label,
                'bonus_amount' => (int) $request->bonus,
                'starts_at' => $request->starts_at,
                'ends_at' => $request->ends_at,
            ];
        } else {
            // Kalau promo dikosongkan → hapus promo
            unset($meta['promo']);
        }

        $package->update([
            'price' => (int) $request->price,
            'meta' => $meta,
        ]);

        return response()->json([
            'message' => 'Package updated',
            'data' => $package
        ]);
    }
}
