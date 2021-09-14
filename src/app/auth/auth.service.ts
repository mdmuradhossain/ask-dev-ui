import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from './signup/register-request';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/register',
      registerRequest,
      { responseType: 'text' }
    );
  }
}
