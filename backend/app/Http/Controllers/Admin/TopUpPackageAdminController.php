<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TopUpPackage;
use Illuminate\Http\Request;

class TopUpPackageAdminController extends Controller
{
    /**
     * List packages + game info
     */
    public function index()
    {
        return response()->json([
            'data' => TopUpPackage::with('game:id,code,name')
                ->orderBy('game_id')
                ->orderBy('id')
                ->get()
        ]);
    }

    /**
     * Update harga / promo
     */
   public function update(Request $request, $id)
{
    $data = $request->validate([
        'price' => 'required|integer|min:0',
        'promo_enabled' => 'boolean',
        'promo_price' => 'nullable|integer|min:0',
    ]);

    $package = TopUpPackage::findOrFail($id);

    // update harga normal
    $package->price = $data['price'];

    // toggle promo
    if (array_key_exists('promo_enabled', $data)) {
        $package->promo_enabled = $data['promo_enabled'];
    }

    // simpan harga promo ke meta
    if (isset($data['promo_price'])) {
        $meta = $package->meta ?? [];
        $meta['promo']['price'] = $data['promo_price'];
        $package->meta = $meta;
    }

    $package->save();

    return response()->json([
        'message' => 'Package updated'
    ]);
}

    /**
     * Delete package
     */
    public function destroy($id)
    {
        TopUpPackage::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Package deleted'
        ]);
    }
}
