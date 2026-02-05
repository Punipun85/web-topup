<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            
            // Judul Artikel (misal: "Build Fredrinn Tersakit...")
            $table->string('title');
            
            // Slug untuk URL cantik (misal: "build-fredrinn-tersakit")
            $table->string('slug')->unique(); 

            // Kategori (Default: MINTIME)
            $table->string('category')->default('MINTIME');
            
            // Path/URL Gambar (misal: "/images/articles/fredrinn.jpg")
            $table->string('image')->nullable();
            
            // Isi Konten Artikel
            // SAYA HAPUS baris '$table->text...' yang duplikat.
            // Gunakan longText agar kapasitasnya besar (cukup untuk artikel panjang + HTML).
            $table->longText('content'); 

            $table->timestamps(); // Created_at & Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};