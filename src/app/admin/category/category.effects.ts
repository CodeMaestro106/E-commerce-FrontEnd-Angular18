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
  getCategoryListSuccess,
  createCategoryAction,
  createCategorySuccess,
  categoryActionFailure,
  updateCategorySuccess,
  deleteCategoryAction,
  deleteCategorySuccess,
  updateCategoryAction,
} from './category.actions';
import { CategoryService } from './category.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Injectable()
export class CategoryEffects {
  getCategoryListAction$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getCategoryListAction),
      tap(() => {
        console.log('category list effect');
      }),
      switchMap(() =>
        this.categoryService.getCategoryList().pipe(
          map((response) => {
            return getCategoryListSuccess({ categories: response });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Getting Category info had failed. Please try again.';
            return of(categoryActionFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  createCategoryEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(createCategoryAction),
      tap(() => {
        console.log('category list effect');
      }),
      switchMap((action) =>
        this.categoryService.createCategory(action.category).pipe(
          map((response) => {
            console.log(response);
            return createCategorySuccess({ category: response });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Adding Category info had failed. Please try again.';
            return of(categoryActionFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  updateCategoryEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(updateCategoryAction),
      tap(() => {
        console.log('category list effect');
      }),
      switchMap((action) =>
        this.categoryService.updateCategory(action.id, action.name).pipe(
          map((response) => {
            console.log(response);
            return updateCategorySuccess({ category: response });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Adding Category info had failed. Please try again.';
            return of(categoryActionFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  deleteCategoryItem$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(deleteCategoryAction),
      tap(() => {
        console.log('category list effect');
      }),
      switchMap((action) =>
        this.categoryService.deleteCategory(action.id).pipe(
          map((response) => {
            return deleteCategorySuccess({ id: response.id });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Deleting Category info had failed. Please try again.';
            return of(categoryActionFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  navigateToCategoryList$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(createCategorySuccess, updateCategorySuccess),
        tap(() => {
          this.router.navigate(['admin/categories']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}
}
