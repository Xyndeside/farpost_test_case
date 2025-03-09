import { Route } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const appRoutes: Route[] = [
    //С главной страницы перенаправляем на страницу аутентификации
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthPageComponent}
];
