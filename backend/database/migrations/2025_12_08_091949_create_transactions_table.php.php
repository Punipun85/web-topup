<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            
            // --- INFORMASI TRANSAKSI ---
            $table->string('invoice_id')->unique(); // Contoh: TRX-998877
            $table->string('email');                // Email pembeli
            $table->string('status')->default('PENDING'); // PENDING, SUCCESS, FAILED
            
            // --- DATA AKUN GAME ---
            $table->string('game_user_id');         // ID Akun Game user
            $table->string('zone_id')->nullable();  // Zone ID
            $table->string('game');                 // Nama Game

            // --- DATA ITEM ---
            $table->string('item_name');            // Misal: 100 Diamonds
            $table->decimal('price', 15, 2);        // Harga satuan
            $table->integer('quantity')->default(1);// Jumlah beli
            $table->decimal('total_price', 15, 2);  // Total bayar
            
            // --- PEMBAYARAN ---
            $table->string('payment_method');       // Misal: QRIS, BCA, dll
            
            // --- OPSIONAL (JIKA LOGIN) ---
            $table->unsignedBigInteger('user_id')->nullable(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};