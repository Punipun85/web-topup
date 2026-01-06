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
        Schema::create('orders', function (Blueprint $table) {
    $table->id();

    $table->string('order_number')->unique();

    // 🔗 relasi ke transaksi utama
    $table->foreignId('topup_id')
        ->constrained('topups')
        ->cascadeOnDelete();

    // siapa yang mencoba bayar
    $table->foreignId('user_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

    // payment info
    $table->string('payment_method'); // midtrans, manual, dll
    $table->unsignedInteger('amount'); // snapshot amount saat bayar

    // status KHUSUS PAYMENT
    $table->enum('status', [
        'pending',
        'paid',
        'failed',
        'expired',
        'cancelled'
    ])->default('pending');

    // raw payload dari gateway
    $table->json('payment_payload')->nullable();

    $table->timestamps();

    $table->index(['topup_id', 'status']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
