<?php
namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function index(Request $r){
        $game = $r->query('game');
        $q = Product::where('active', true);
        if($game) $q->whereHas('game', fn($qq)=> $qq->where('slug',$game));
        return response()->json($q->with('game')->paginate(20));
    }
    public function show($id){
        $p = Product::with('game')->findOrFail($id);
        return response()->json($p);
    }
}
