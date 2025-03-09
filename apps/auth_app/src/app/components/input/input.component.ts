import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    ReactiveFormsModule,
} from '@angular/forms';
import { ThemeType } from '../../pages/auth-page/auth-page.component';

type InputType = 'text' | 'email' | 'password';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor {
    @Input() type: InputType = 'text';
    @Input() placeholder?: string;
    @Input() theme: ThemeType = 'light';
    @Input() error?: boolean = false;
    @Input() errorMessage?: string;

    getErrorIconSrc(): string {
        return this.theme === 'light'
            ? '/icons/error.svg'
            : '/icons/error-alt.svg';
    }

    // Code for using formControlName with custom input component
    value = '';
    onChange: (value: string) => void = () => {};
    onTouched: () => void = () => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.value = target.value;
        this.onChange(this.value);
    }
}
