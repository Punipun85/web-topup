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

    $table->foreignId('game_id')
        ->constrained('games')
        ->cascadeOnDelete();

    $table->string('name', 100); // "50 Diamonds"
    $table->unsignedInteger('amount'); // nominal topup
    $table->unsignedInteger('price'); // harga jual

    $table->json('meta')->nullable(); // bonus, event, dll

    $table->boolean('active')->default(true)->index();

    $table->timestamps();

    $table->index(['game_id', 'active']);
});
    }

    public function down(): void
    {
        Schema::dropIfExists('topup_packages');
    }
};
