import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getUserListAction,
  getUserListSuccess,
  actionUserFailure,
  deleteUserAction,
  deleteUserSuccess,
} from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  getUserListEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getUserListAction),
      switchMap(() =>
        this.UserService.getUserList().pipe(
          map((response) => {
            console.log('response => ', response);
            return getUserListSuccess({ users: response });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Adding User info had failed. Please try again.';
            return of(actionUserFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  deleteUserEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(deleteUserAction),
      switchMap((action) =>
        this.UserService.deleteUser(action.id).pipe(
          map((response) => {
            return deleteUserSuccess({ id: action.id });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Removing User info had failed. Please try again.';
            return of(actionUserFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  constructor(private UserService: UserService) {}
}
