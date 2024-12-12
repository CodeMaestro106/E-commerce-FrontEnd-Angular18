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
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CartEffect {
  // add Item In Cart
  addItemInCart$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(addItemInCart),
      tap(() => console.log('add Item cart ')),
      mergeMap((action) =>
        this.cartService
          .addProductToCart(action.productId, action.quantity)
          .pipe(
            // Call Server via service here
            map((response) => {
              this.toastService.success('', 'Success');
              return getItemsInCartSuccess({ cartitems: response });
            }),
            catchError((error) => {
              const errorMessage =
                error?.error?.msg ||
                'Adding Cart info had failed. Please try again.';
              this.toastService.error(errorMessage, 'Error');

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
      tap(() => console.log('get Item cart ')),

      mergeMap(() =>
        this.cartService.getCart().pipe(
          map((response) => {
            console.log('get user cart Item respones=>', response);
            return getItemsInCartSuccess({ cartitems: response });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Geting Cart info had failed. Please try again.';
            this.toastService.error(errorMessage, 'Error');

            return of(getItemsInCartFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  // Navigate to cart page after succesful addition
  // have a mistake!
  navigateToCart$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(getItemsInCartSuccess),
        tap(() => {
          //this.router.navigate(['/cart']);
        }),
      ),
    { dispatch: false },
  );

  getItemsInCartFailure$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(getItemsInCartFailure),
        tap(() => {
          this.router.navigate(['']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private router: Router,
    private toastService: ToastrService,
  ) {}
}
