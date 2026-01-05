<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            
            // Kolom Penting untuk Transaksi & Midtrans
            $table->string('invoice_id')->unique(); // Invoice TRX-XXXX
            $table->string('email');               // Email pembeli
            $table->string('game_user_id');        // ID Game Player (misal: 123456)
            $table->string('zone_id')->nullable(); // Zone ID (khusus MLBB, game lain null)
            
            $table->string('game');                // Nama Game (Valorant, MLBB)
            $table->string('item_name');           // Nama Item (100 Diamond)
            $table->integer('amount');             // Jumlah Diamond (angka mentah)
            
            $table->decimal('price', 15, 2);       // Harga Satuan
            $table->integer('quantity')->default(1); // Jumlah Beli
            $table->decimal('total_price', 15, 2); // Total Bayar
            
            $table->string('payment_method')->nullable(); // Metode Bayar (BCA, QRIS)
            $table->string('status')->default('PENDING'); // PENDING / SUCCESS / FAILED
            $table->string('snap_token')->nullable(); // Token dari Midtrans
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};