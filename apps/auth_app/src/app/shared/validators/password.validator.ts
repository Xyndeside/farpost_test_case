import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const errors: ValidationErrors = {};

        if (value.length < 6) {
            errors['shortPassword'] = true;
        }
        if (!/[A-Z]/.test(value)) {
            errors['missingUppercase'] = true;
        }
        if (!/[a-z]/.test(value)) {
            errors['missingLowercase'] = true;
        }
        if (!/\d/.test(value)) {
            errors['missingNumber'] = true;
        }
        if (!/[!@#$%^&*]/.test(value)) {
            errors['missingSpecialChar'] = true;
        }

        return Object.keys(errors).length ? errors : null;
    };
}
