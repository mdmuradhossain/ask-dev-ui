import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from './signup/register-request';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './login/login-request';
import { LoginResponse } from './login/login-response';
import { map } from 'rxjs/operators';

import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signUp(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/auth/register`,
      registerRequest,
      { responseType: 'text' }
    );
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, loginRequest)
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          return true;
        })
      );
  }
}