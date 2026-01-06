<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TopUpPackage;
use Illuminate\Http\Request;

class TopUpPackageAdminController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => TopUpPackage::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $package = TopUpPackage::findOrFail($id);
        $package->update($request->all());

        return response()->json([
            'message' => 'Package updated'
        ]);
    }

    public function removePromo($id)
    {
        $package = TopUpPackage::findOrFail($id);
        $package->promo = null;
        $package->save();

        return response()->json([
            'message' => 'Promo removed'
        ]);
    }
}
