<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class InvalidSubscription implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!str_contains($value,"-")){
            $fail("Uw abonnementsnuumer heeft niet juiste formaat.");
            return;
        }

        $values = explode("-", $value);

        $total = $values[0].$values[1] ;

        if(isset($values[2]) && $total%98 != $values[2]){
            $fail("Uw abonnementsnummer is ongeldig!");
        }
    }
}
