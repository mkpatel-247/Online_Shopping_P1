import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"
import * as EmailValidator from 'email-validator';

export function isEmailValid(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        return !EmailValidator.validate(control.value) ? { email: true } : null;
    }
}