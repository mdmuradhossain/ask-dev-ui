import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from './signup/register-request';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './login/login-request';
import { LoginResponse } from './login/login-response';
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

  login(LoginRequest: LoginRequest): Observable<any> {
    return this.httpClient
      .post<LoginResponse>(`${this.baseUrl}/login`, LoginRequest)
      .pipe(
        map((data) => {
          console.log(data);
        })
      );
  }
}
