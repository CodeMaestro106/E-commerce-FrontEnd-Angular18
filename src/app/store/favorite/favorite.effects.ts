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
  actionFavoriteFailure,
  getFavoriteListAction,
  getFavoriteListSuccess,
  addFavoriteAction,
  addFavoriteSuccess,
  deleteFavoriteAction,
  deleteFavoriteSuccess,
} from './favorite.actions';
import { FavoriteService } from './favorite.service';
import { Router } from '@angular/router';
import { ProductService } from '../product/product.service';

@Injectable()
export class FavoriteEffects {
  getFavoriteListAction$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getFavoriteListAction),
      switchMap(() =>
        this.favoriteService.getFavoriteList().pipe(
          map((response) => {
            const processData = response.map((item) => {
              return this.productService.transformToProduct(item);
            });
            return getFavoriteListSuccess({ products: processData });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Adding Product info had failed. Please try again.';
            return of(actionFavoriteFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  addFavoriteEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(addFavoriteAction),
      tap(() => {
        console.log('Favorite list effect');
      }),
      switchMap((action) =>
        this.favoriteService.addProductToFavorite(action.productId).pipe(
          map((response) => {
            console.log('adding product in wishlist is success', response);
            const processData = this.productService.transformToProduct(
              response.product,
            );
            return addFavoriteSuccess({ product: processData });
          }),
          catchError((error) => {
            console.log('add product respones error =>', error);

            const errorMessage =
              error?.error?.msg ||
              'Adding Product to Favorite List had failed. Please try again.';
            return of(actionFavoriteFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  deleteFavoriteItem$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(deleteFavoriteAction),
      tap(() => {
        console.log('deleting product in Favorite list effect');
      }),
      switchMap((action) =>
        this.favoriteService.deleteProductInFavorite(action.productId).pipe(
          map((response) => {
            return deleteFavoriteSuccess({ productId: action.productId });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Deleting Product info had failed. Please try again.';
            return of(actionFavoriteFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  constructor(
    private favoriteService: FavoriteService,
    private productService: ProductService,
  ) {}
}
