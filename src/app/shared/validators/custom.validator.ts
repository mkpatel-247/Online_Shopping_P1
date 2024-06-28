import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import isStrongPassword from 'validator/es/lib/isStrongPassword';
import * as EmailValidator from 'email-validator';


/**
 * Only space should not be there in any text/textarea field.
 * There must be one character.
 */
export function isOnlySpaceExist(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        return control.value && control.value.trim() ? null : { spaceExist: true };
    }
}

/**
 * Check validation for checkbox and radio button.
 * One must be selected.
 */
export function oneCheckBoxMustChecked(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const checkbox = control.value;

        const value = checkbox.some((checked: boolean) => checked);
        return value ? null : { mustBeChecked: true };
    };
}

export function isEmailValid(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        return !EmailValidator.validate(control.value) ? { email: true } : null;
    }
}

export function isPasswordStrong(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const validatorOptions = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

        return !isStrongPassword(control.value, validatorOptions) ? { password: true } : null;
    }
}