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
        Schema::create('transactions', function (Blueprint $table) {
    $table->id();

    $table->foreignId('order_id')
        ->constrained()
        ->cascadeOnDelete();

    // payment gateway
    $table->string('provider'); 
    // contoh: midtrans, xendit, dummy

    // id dari payment gateway
    $table->string('provider_trx_id')->nullable();

    // metode pembayaran
    $table->string('payment_method')->nullable();
    // contoh: qris, va_bca, ewallet

    $table->decimal('amount', 12, 2);

    $table->enum('status', [
        'pending',
        'success',
        'failed',
        'expired',
        'refunded'
    ])->default('pending');

    $table->json('raw_response')->nullable();

    $table->timestamps();
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
