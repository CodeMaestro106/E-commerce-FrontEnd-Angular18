import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  finalize,
  mergeMap,
  retry,
  switchMap,
} from 'rxjs';

import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AuthStorageService } from '../auth/auth.storage.service';
import { USER_KEY, USER_TOKEN_KEY } from '../auth/auth.type';
import { AuthService } from '../auth/auth.service';
import { response } from 'express';
import { BehaviorSubject, take, filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private storageService: AuthStorageService,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  private isRefreshing: boolean = false; // Flag to indicate if a refresh request is in progress
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // If no user is logged in, just pass the request
    if (!this.storageService.getUser()) {
      return next.handle(req);
    }

    // If token is expired, attempt to refresh
    if (this.storageService.isTokenExpired()) {
      return this.refreshAccessToken(req, next);
    }

    const user = this.storageService.getUser();

    if (user && user.token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

  private addAuthorizationHeader(
    req: HttpRequest<any>,
    accessToken: string,
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  private refreshAccessToken(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const refreshToken = this.storageService.getRefreshToken();

    if (!refreshToken) {
      this.storageService.clean();
      this.router.navigate(['/login']);
      return EMPTY;
    }

    // If a refresh token request is already in progress, wait for its result
    if (this.isRefreshing) {
      alert('is refreshing is true => ' + this.isRefreshing);

      return this.refreshTokenSubject.pipe(
        filter((token) => token != null), // Wait until we have a new token
        take(1),
        switchMap((token) => {
          // Retry the original request with the new token
          alert('is refreshing is true => ' + token);
          // Retry the original request with the new access token
          return next.handle(this.addAuthorizationHeader(req, token || ''));
        }),
      );
    }
    // If no refresh is in progress, start refreshing the token
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null); // Reset the subject

    alert('pre is refreshing is true => ' + refreshToken);

    // return this.authService.refreshToken(refreshToken).subscribe((data) => {
    //   return next.handle(data.refreshToken);
    // });

    return this.http
      .post<{
        accessToken: string;
        refreshToken: string;
      }>(`http://localhost:5000/auth/refresh-token`, { refreshToken })
      .pipe(
        take(1),
        tap(() => {
          alert('Request sent');
        }),
        switchMap((response) => {
          alert(
            'after connecting datebase, the result true => ' +
              response.accessToken +
              '  and ' +
              response.refreshToken,
          );
          // Store the new tokens after refreshing
          this.storageService.storeTokens(
            response.accessToken,
            response.refreshToken,
          );

          // Emit the new access token to all waiting requests
          this.refreshTokenSubject.next(response.accessToken);
          // Retry the original request with the new access token
          return next.handle(
            this.addAuthorizationHeader(req, response.accessToken),
          );
        }),
        catchError((err) => {
          // If the refresh token request fails (e.g., refresh token is expired), log out the user
          this.storageService.clean();
          this.router.navigate(['/login']);
          return EMPTY;
        }),
        // After the refresh process is complete, reset the refreshing state
        finalize(() => {
          alert('before finalize : ' + this.isRefreshing);
          this.isRefreshing = false;
          alert('after finalize : ' + this.isRefreshing);
          // return EMPTY;
        }),
      );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
