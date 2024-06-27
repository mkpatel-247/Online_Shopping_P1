import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isOnlySpaceExist(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        return control.value && control.value.trim() ? null : { spaceExist: true };
    }
}