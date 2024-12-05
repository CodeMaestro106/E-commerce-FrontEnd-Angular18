import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import {
  getCategoryListAction,
  getCategoryListFailure,
  getCategoryListSuccess,
} from './category.actions';
import { CategoryService } from './category.service';
import { response } from 'express';

@Injectable()
export class CategoryEffects {
  getCategoryListAction$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getCategoryListAction),
      tap(() => console.log('category list effect')),
      switchMap(() =>
        this.categoryService.getCategoryList().pipe(
          map((response) => {
            console.log(response);
            return getCategoryListSuccess({ categories: response });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Adding Cart info had failed. Please try again.';
            return of(getCategoryListFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  constructor(private categoryService: CategoryService) {}
}
