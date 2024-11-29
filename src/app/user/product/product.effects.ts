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
  getProductListAction,
  getProductListSuccess,
  getProductListFailure,
} from './product.actions';
import { ProductService } from './product.service';
import { response } from 'express';

@Injectable()
export class ProductEffects {
  getProductListAction$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getProductListAction),
      switchMap(() =>
        this.productService.getProductList().pipe(
          map((response) => {
            const processData = response.map((item) => {
              return this.productService.transformToProduct(item);
            });
            return getProductListSuccess({ products: processData });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Adding Product info had failed. Please try again.';
            return of(getProductListFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  constructor(private productService: ProductService) {}
}
