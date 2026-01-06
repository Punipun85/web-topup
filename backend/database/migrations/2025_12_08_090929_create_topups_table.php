<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('topups', function (Blueprint $table) {
    $table->id();

    // identitas publik
    $table->string('topup_code')->unique();

    // relasi user (opsional)
    $table->foreignId('user_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

    // relasi inti
    $table->foreignId('game_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('package_id')
        ->constrained('topup_packages')
        ->cascadeOnDelete();

    // data target game
    $table->string('player_id');
    $table->string('server_id')->nullable();

    // kontak
    $table->string('email')->nullable();

    // snapshot bisnis
    $table->unsignedInteger('amount'); // harga final saat transaksi

    // status TRANSAKSI (bukan payment)
    $table->enum('status', ['pending','success','failed'])
        ->default('pending')
        ->index();

    $table->timestamps();

    $table->index(['game_id', 'status']);
});

    }

    public function down(): void
    {
        Schema::dropIfExists('topups');
    }
};
