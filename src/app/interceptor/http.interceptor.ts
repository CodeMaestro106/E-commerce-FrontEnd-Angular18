import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  finalize,
  mergeMap,
  retry,
  switchMap,
  throwError,
} from 'rxjs';

import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AuthStorageService } from '../auth/auth.storage.service';
import { USER_KEY, USER_TOKEN_KEY } from '../auth/auth.type';
import { AuthService } from '../auth/auth.service';
import { response } from 'express';
import { BehaviorSubject, take, filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


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

    const user = this.storageService.getUser();

    return next.handle(this.addAuthorizationHeader(req, user.token)).pipe(
      catchError((error) => {
        if(
          error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401
        ){
          console.log("user pre token =>", user.token);
          return this.refreshAccessToken(req, next)
        }
        return throwError(()=> error);
      })
    );
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

      return this.refreshTokenSubject.pipe(
        filter((token) => token != null), // Wait until we have a new token
        take(1),
        switchMap((token) => {
          // Retry the original request with the new token
          // Retry the original request with the new access token
          return next.handle(this.addAuthorizationHeader(req, token || ''));
        }),
      );
    }
    // If no refresh is in progress, start refreshing the token
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null); // Reset the subject

    return this.authService.refreshToken(refreshToken)
      .pipe(
        switchMap((response) => {
          console.log(
            'after connecting datebase, the result true => ',
              response.refreshToken
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
          console.log("refresh token error =>", err);
          // If the refresh token request fails (e.g., refresh token is expired), log out the user
          this.storageService.clean();
          alert();
          this.router.navigate(['/login']).then(() => window.location.reload());
          return EMPTY;
        }),
        // After the refresh process is complete, reset the refreshing state
        finalize(() => {
          this.isRefreshing = false;
          // return EMPTY;
        }),
      );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
