import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  itemAddedSuccess,
  getItemsInCart,
  addItemInCart,
  getItemsInCartSuccess,
  getItemsInCartFailure,
  itemAddedFailure,
} from './cart.actions';
import { CartService } from './cart.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CartEffect {
  // add Item In Cart
  addItemInCart$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(addItemInCart),
      mergeMap((action) =>
        this.cartService
          .addProductToCart(action.productId, action.quantity)
          .pipe(
            // Call Server via service here
            map((response) => {
              return getItemsInCartSuccess({ cartitems: response });
            }),
            catchError((error) => {
              const errorMessage =
                error?.error?.msg ||
                'Adding Cart info had failed. Please try again.';
              return of(itemAddedFailure({ error: errorMessage }));
            }),
          ),
      ),
    ),
  );

  // get Items from cartitem database
  getItemsInCart$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getItemsInCart),
      mergeMap(() =>
        this.cartService.getCart().pipe(
          map((response) => {
            return getItemsInCartSuccess({ cartitems: response });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Geting Cart info had failed. Please try again.';
            return of(getItemsInCartFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  // Navigate to cart page after succesful addition
  navigateToCart$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(getItemsInCartSuccess),
        tap(() => {
          this.router.navigate(['/cart']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private router: Router,
  ) {}
}
