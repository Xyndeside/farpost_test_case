import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-theme-toggle',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './theme-toggle.component.html',
    styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
    @Input() isDarkMode: boolean = false;
    @Output() themeChange = new EventEmitter<boolean>();

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.themeChange.emit(this.isDarkMode);
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    }
}
