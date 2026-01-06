<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Topup;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TransactionService
{
    /**
     * Finalize payment result
     *
     * @param Order  $order
     * @param string $result success|failed
     * @param array|null $payload raw gateway payload
     */
    public function finalize(Order $order, string $result, ?array $payload = null): void
    {
        DB::transaction(function () use ($order, $result, $payload) {

            // lock order
            $order = Order::where('id', $order->id)
                ->lockForUpdate()
                ->first();

            // idempotency guard
            if ($order->status !== 'pending') {
                return;
            }

            $topup = Topup::where('id', $order->topup_id)
                ->lockForUpdate()
                ->first();

            // safety check
            if (!$topup || $topup->status !== 'pending') {
                $order->update([
                    'status' => 'failed',
                    'payment_payload' => $payload
                ]);
                return;
            }

            // 1️⃣ update order
            $order->update([
                'status' => $result,
                'payment_payload' => $payload
            ]);

            // 2️⃣ update topup
            $topup->update([
                'status' => $result
            ]);

            // 3️⃣ insert ledger (ONLY ONCE)
            Transaction::create([
                'topup_id'      => $topup->id,
                'invoice_id'    => $order->order_number,
                'game_name'     => $topup->game->name,
                'package_name'  => $topup->package->name,
                'amount'        => $topup->amount,
                'price'         => $topup->amount,
                'payment_method'=> $order->payment_method,
                'payer_email'   => $topup->email,
                'status'        => $result,
                'finalized_at'  => Carbon::now(),
            ]);
        });
    }
}
