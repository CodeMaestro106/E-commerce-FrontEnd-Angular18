import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getCartActionFailure,
  getCartListAction,
  getCartListSuccess,
} from './cart.actions';
import { CartService } from './cart.service';

@Injectable()
export class CartEffects {
  getCartListEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getCartListAction),
      tap(() => {
        console.log('cart list effect');
      }),
      switchMap(() =>
        this.cartService.getAllCartInfo().pipe(
          map((response) => {
            console.log('get cart list ', response);

            const processData = response.map((item) => {
              return this.cartService.transformToCart(item);
            });

            return getCartListSuccess({ carts: processData });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Getting Cart info had failed. Please try again.';
            return of(getCartActionFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  constructor(private cartService: CartService) {}
}
