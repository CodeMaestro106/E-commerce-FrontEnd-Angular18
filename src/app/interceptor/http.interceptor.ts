import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AuthStorageService } from '../auth/auth.storage.service';
import { USER_KEY, USER_TOKEN_KEY } from '../auth/auth.type';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private storageService: AuthStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.storageService.isTokenExpired()) {
      // If the token is expired, log the user out
      this.storageService.clean();

      this.router.navigate(['/login']); // Redirect to login page
      return EMPTY;
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
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
