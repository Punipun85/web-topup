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

            // Relasi dari versi teman
            $table->foreignId('topup_id')
                ->nullable()
                ->constrained('topups')
                ->cascadeOnDelete();

            $table->string('invoice_id')->unique();
            $table->string('email'); 
            $table->string('payer_email')->nullable(); 
            
            $table->string('game_user_id'); 
            $table->string('zone_id')->nullable(); 

            $table->string('game'); 
            $table->string('game_name')->nullable();
            $table->string('item_name'); 
            $table->string('package_name')->nullable();
            
            $table->integer('amount'); 
            $table->decimal('price', 15, 2); 
            $table->integer('quantity')->default(1);
            $table->decimal('total_price', 15, 2); 
            
            $table->string('payment_method')->nullable();
            $table->string('status')->default('PENDING'); 
            $table->string('snap_token')->nullable(); 
            $table->timestamp('finalized_at')->nullable();

            $table->timestamps();
            $table->index(['status']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};