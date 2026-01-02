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
            
            // --- INI BARIS YANG HILANG SEBELUMNYA ---
            // Pastikan foreignId mengarah ke 'user_id'
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            
            $table->string('game'); 
            $table->string('item_name');
            $table->decimal('amount', 15, 2); 
            $table->string('status')->default('PENDING'); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};