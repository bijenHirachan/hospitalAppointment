<?php

namespace App\Http\Requests;

use App\Rules\Housefull;
use App\Rules\InvalidSubscription;
use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "day" => "required",
            "timeslot" => ["required", new Housefull],
            "users.*.first_name" => "required",
            "users.*.last_name" => "required",
            "users.*.subscription_number" => ["nullable", "regex:/^[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9]/i", new InvalidSubscription],
        ];
    }
}
