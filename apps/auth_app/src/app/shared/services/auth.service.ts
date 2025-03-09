import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

type reqParam = string | null | undefined;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    cookieService = inject(CookieService);

    private apiUrl = 'https://www.vl.ru/authtestcase/signin';

    token: string | null = null;

    get isAuth() {
        if (!this.token) {
            this.token = this.cookieService.get('token');
        }
        return !!this.token;
    }

    signIn(email: reqParam, password: reqParam): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(
                this.apiUrl,
                {
                    email,
                    password,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .pipe(
                tap((value) => {
                    this.token = value.token;

                    this.cookieService.set('token', this.token);
                })
            );
    }
}
