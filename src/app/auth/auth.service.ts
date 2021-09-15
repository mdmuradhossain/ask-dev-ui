import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from './signup/register-request';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  signUp(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/auth/register`,
      registerRequest,
      { responseType: 'text' }
    );
  }
}
