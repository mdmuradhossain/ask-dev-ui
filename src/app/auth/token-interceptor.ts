import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LoginResponse } from './login/login-response';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      this.addToken(req, this.authService.getJwtToken());
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handleAuthErrors(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }
  addToken(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
    });
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(
            refreshTokenResponse.authenticationToken
          );
          return next.handle(
            this.addToken(req, refreshTokenResponse.authenticationToken)
          );
        })
      );
    }
  }
}