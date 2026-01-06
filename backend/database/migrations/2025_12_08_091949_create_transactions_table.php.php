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

    // referensi ke transaksi utama
    $table->foreignId('topup_id')
        ->constrained('topups')
        ->cascadeOnDelete();

    // identitas final
    $table->string('invoice_id')->unique();

    // snapshot data (tidak join ke mana-mana)
    $table->string('game_name');
    $table->string('package_name');
    $table->unsignedInteger('amount');
    $table->unsignedInteger('price');

    // siapa & bagaimana bayar
    $table->string('payment_method');
    $table->string('payer_email')->nullable();

    // hasil akhir
    $table->enum('status', ['success','failed']);

    // waktu sukses/gagal
    $table->timestamp('finalized_at');

    $table->timestamps();

    $table->index(['topup_id', 'status']);
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