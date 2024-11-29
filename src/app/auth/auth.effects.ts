import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  login,
  verifyOtp,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
  sendOtp,
} from './auth.actions';
import { Store, createAction } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthStorageService } from './auth.storage.service';
import { selectUser } from './auth.selectors';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authStoreService: AuthStorageService,
    private router: Router,
    private store: Store,
  ) {
    console.log('Actions:', actions$); // Log actions$ to ensure it's injected correctly
  }

  login$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(login), // Ensure you're listening for the 'login' action
      tap(() => console.log('Login effect triggered')),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((response) => {
            console.log(response);
            // return this.router.navigate(['verify-otp']);
            // return loginSuccess({ user: response.user, token: response.token });

            return sendOtp({ email: action.email, password: action.password });
          }),
          catchError((error) => {
            console.log(error);

            const errorMessage =
              error?.error?.msg || 'Login failed. Please try again.';
            return of(loginFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  sendOtp$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(sendOtp),
        tap((action) => {
          console.log('verify-otp=>', action);
          // Navigate to the main dashboard after register success
          this.router.navigate(['verify-otp'], {
            state: { email: action.email, password: action.password },
          }); // Adjust route path as necessary
        }),
      ),
    { dispatch: false }, // No action is dispatched after navigation
  );

  verifyOtp$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(verifyOtp), // Ensure you're listening for the 'login' action
      tap(() => console.log('Login effect triggered')),
      switchMap((action) =>
        this.authService.verifyOtp(action.email, action.otp).pipe(
          map((response) => {
            console.log(response);
            return loginSuccess({ user: response.user, token: response.token });
          }),
          catchError((error) => {
            console.log(error);

            const errorMessage =
              error?.error?.msg || 'Login failed. Please try again.';
            return of(loginFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(register), // Ensure you're listening for the 'login' action
      tap(() => console.log('Register effect triggered')),
      switchMap((action) =>
        this.authService
          .register(action.username, action.email, action.password)
          .pipe(
            map((response) => {
              console.log(response);
              return registerSuccess();
            }),
            catchError((error) => {
              console.log(error);
              const errorMessage =
                error?.error?.msg || 'Register failed. Please try again.';
              return of(registerFailure({ error: errorMessage }));
            }),
          ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(loginSuccess),
        tap(() => {
          this.store.select(selectUser).subscribe((user) => {
            this.authStoreService.saveUser(user);
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload(); // Force page reload after navigation
            });
          });
        }),
      ),
    { dispatch: false }, // No action is dispatched after navigation
  );

  registerSuccess$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(registerSuccess),
        tap(() => {
          console.log('register success');
          // Navigate to the main dashboard after register success
          this.router.navigate(['/login']); // Adjust route path as necessary
        }),
      ),
    { dispatch: false }, // No action is dispatched after navigation
  );

  logout$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(logout),
        tap(() => {
          console.log('logout');
          this.router.navigate(['/dashboard']).then(() => {
            this.authStoreService.clean();
          });
        }),
      ),
    { dispatch: false }, // No action is dispatched after navigation
  );
}
