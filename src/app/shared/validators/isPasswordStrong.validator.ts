import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"
import isStrongPassword from 'validator/es/lib/isStrongPassword';

export function isPasswordStrong(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const validatorOptions = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

        return !isStrongPassword(control.value, validatorOptions) ? { password: true } : null;
    }
}