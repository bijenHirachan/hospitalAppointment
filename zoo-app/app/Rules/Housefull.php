<?php

namespace App\Rules;

use App\Models\Schedule;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Housefull implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $schedule = Schedule::find($value);

        if($schedule->reservations->count() >= 200){
            $fail("Het aantal bezoekers heeft de limiet al overschreden. Kies een ander tijdslot.");
        }
    }
}
