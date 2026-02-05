<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('orders', function (Blueprint $table) {
    $table->id();

    $table->string('order_number')->unique();

    // RELASI WAJIB
    $table->foreignId('topup_id')
        ->constrained('topups')
        ->cascadeOnDelete();

    // siapa yang membayar (opsional)
    $table->foreignId('user_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

    // payment info
    $table->string('payment_method'); // qris, bca_transfer, dll
    $table->unsignedInteger('amount'); // snapshot amount saat bayar

    // status KHUSUS PAYMENT
    $table->enum('status', [
        'pending',
        'waiting_confirmation', // manual transfer
        'paid',
        'failed',
        'expired',
        'cancelled'
    ])->default('pending')->index();

    // bukti transfer (manual)
    $table->string('payment_proof')->nullable();

    // raw payload dari gateway / admin
    $table->json('payment_payload')->nullable();

    // waktu payment final
    $table->timestamp('paid_at')->nullable();

    $table->timestamps();

    $table->index(['topup_id', 'payment_method']);
});

    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
