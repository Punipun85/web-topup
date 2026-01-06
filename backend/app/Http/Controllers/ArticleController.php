<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    // 1. API untuk mengambil SEMUA artikel (Halaman Home)
    public function index()
    {
        // Ambil semua data dari tabel 'articles', urutkan dari yang terbaru
        $articles = DB::table('articles')->orderBy('created_at', 'desc')->get();
        
        return response()->json($articles);
    }

    // 2. API untuk mengambil SATU artikel (Halaman Detail)
    public function show($id)
    {
        $article = \App\Models\Article::find($id);

        if (!$article) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        return response()->json($article);
    }
}