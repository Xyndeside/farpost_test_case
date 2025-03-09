import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { passwordValidator } from '../../shared/validators/password.validator';
import { AuthService } from '../../shared/services/auth.service';

export type ThemeType = 'dark' | 'light';

@Component({
    selector: 'app-auth-page',
    imports: [
        CommonModule,
        RouterLink,
        InputComponent,
        ThemeToggleComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
    authService = inject(AuthService);

    // Work with form
    form = new FormGroup({
        email: new FormControl('', [Validators.required, emailValidator()]),
        password: new FormControl('', [Validators.required, passwordValidator()]),
    });

    //Loading state to block the login button while the request is processing
    isLoading = false;

    onSubmit() {
        if (this.form.invalid) return;

        this.isLoading = true;
        const { email, password } = this.form.value;

        this.authService.signIn(email, password).subscribe({
            next: (response) => {
                console.log(`Welcome, ${response.user.name}!`);
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Login failed:', error);
                this.isLoading = false;
            },
        });
    }

    // Generate error message by using controlName
    getErrorMessage(controlName: string): string | undefined {
        const control = this.form.get(controlName);

        if (control?.hasError('required')) {
            return 'This field is required';
        }

        if (controlName === 'email' && control?.hasError('invalidEmail')) {
            return 'Invalid email';
        }

        if (controlName === 'password' && control?.errors) {
            if (control.errors['shortPassword']) {
                return 'Password is too short';
            }
            if (
                control.errors['missingLowercase'] ||
                control.errors['missingUppercase'] ||
                control.errors['missingNumber'] ||
                control.errors['missingSpecialChar']
            ) {
                return 'Password must contain lowercase letter, uppercase letter, number and special character.';
            }
        }

        return undefined;
    }

    // Work with theme
    isDarkMode = false;
    currentTheme: ThemeType = this.isDarkMode ? 'dark' : 'light';

    ngOnInit() {
        const savedTheme = localStorage.getItem('theme');
        this.isDarkMode = savedTheme === 'dark';
        this.currentTheme = savedTheme === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute(
            'data-theme',
            this.isDarkMode ? 'dark' : 'light'
        );
    }

    onThemeChange(isDark: boolean) {
        this.isDarkMode = isDark;
        this.currentTheme = isDark ? 'dark' : 'light';
    }
}
