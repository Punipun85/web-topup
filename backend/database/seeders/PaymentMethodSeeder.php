<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;

class PaymentMethodSeeder extends Seeder
{
    public function run()
    {
        // KOSONGKAN TABLE DULU AGAR TIDAK DUPLIKAT SAAT DI-SEED ULANG
        // PaymentMethod::truncate(); 
        // (Gunakan truncate() hati-hati jika di production, tapi aman di dev)

        $data = [
            // --- KATEGORI: QRIS ---
            [
                'name'      => 'QRIS (All Payment)',
                'code'      => 'qris',
                'category'  => 'qris',
                'image'     => '/images/qris.png',
                'admin_fee' => 0,
                'is_active' => true,
            ],

            // --- KATEGORI: VIRTUAL ACCOUNT (BANK) ---
            [
                'name'      => 'BCA Virtual Account',
                'code'      => 'bca_va',
                'category'  => 'bank',
                'image'     => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png',
                'admin_fee' => 1000,
                'is_active' => true,
            ],
            [
                'name'      => 'Mandiri Virtual Account',
                'code'      => 'mandiri_va',
                'category'  => 'bank',
                'image'     => 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png',
                'admin_fee' => 1000,
                'is_active' => true,
            ],
            [
                'name'      => 'BRI Virtual Account',
                'code'      => 'bri_va',
                'category'  => 'bank',
                'image'     => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png',
                'admin_fee' => 1000,
                'is_active' => true,
            ],
            [
                'name'      => 'BNI Virtual Account',
                'code'      => 'bni_va',
                'category'  => 'bank',
                'image'     => '/images/bni.png',
                'admin_fee' => 1000,
                'is_active' => true,
            ],

            // --- KATEGORI: E-WALLET ---
            [
                'name'      => 'GoPay',
                'code'      => 'gopay',
                'category'  => 'ewallet',
                'image'     => 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg',
                'admin_fee' => 200,
                'is_active' => true,
            ],
            [
                'name'      => 'DANA',
                'code'      => 'dana',
                'category'  => 'ewallet',
                'image'     => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png',
                'admin_fee' => 200,
                'is_active' => true,
            ],
            [
                'name'      => 'OVO',
                'code'      => 'ovo',
                'category'  => 'ewallet',
                'image'     => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png',
                'admin_fee' => 200,
                'is_active' => true,
            ],
            [
                'name'      => 'ShopeePay',
                'code'      => 'shopeepay',
                'category'  => 'ewallet',
                'image'     => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png',
                'admin_fee' => 200,
                'is_active' => true,
            ],
        ];

        foreach ($data as $item) {
            PaymentMethod::create($item);
        }
    }
}