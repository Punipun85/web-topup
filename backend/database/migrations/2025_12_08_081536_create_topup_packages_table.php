<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('topup_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained('games')->onDelete('cascade');
            $table->string('name'); // contoh: "50 Diamonds"
            $table->integer('amount'); // nominal topup
            $table->integer('price'); // harga jual
            $table->json('meta')->nullable(); // data tambahan, misal: {"bonus": "10 Diamonds"}
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('topup_packages');
    }
};
