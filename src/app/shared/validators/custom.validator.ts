import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

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