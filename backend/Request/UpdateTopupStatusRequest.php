<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTopupStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        // sudah dicek oleh middleware role
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:pending,success,failed',
        ];
    }
}
