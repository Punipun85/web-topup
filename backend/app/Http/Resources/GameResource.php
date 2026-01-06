<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'     => $this->id,
            'name'   => $this->name,
            'slug'   => $this->slug,
            'image'  => $this->image,

            'packages' => $this->whenLoaded('products', function () {
                return $this->products
                    ->where('active', true)
                    ->values()
                    ->map(function ($p) {
                        return [
                            'id'      => $p->id,
                            'name'    => $p->name,
                            'amount'  => (int) $p->amount,
                            'price'   => (int) $p->price,
                            'is_promo'=> (bool) $p->active_promo,
                        ];
                    });
            }),
        ];
    }
}
