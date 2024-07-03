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
 * @returns true if the email is valid ex : abc@gmail.com
 */
export function isEmailValid(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        return !EmailValidator.validate(control.value) ? { email: true } : null;
    }
}

/**
 * @returns true if the password is strong
 */
export function isPasswordStrong(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const validatorOptions = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

        return !isStrongPassword(control.value, validatorOptions) ? { password: true } : null;
    }
}