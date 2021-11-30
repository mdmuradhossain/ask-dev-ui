import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from './signup/register-request';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './login/login-request';
import { LoginResponse } from './login/login-response';
import { map, tap } from 'rxjs/operators';

import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<String> = new EventEmitter();

  refreshTokenRequest = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername(),
  };

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

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }

  logOut() {
    this.httpClient
      .post(`${this.baseUrl}/auth/logout`, this.refreshTokenRequest, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          throwError(err);
        }
      );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        `${this.baseUrl}/auth/refresh/token`,
        this.refreshTokenRequest
      )
      .pipe(
        map((response) => {
          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  isLoggedIn() {
    return this.getJwtToken() != null;
  }
}
