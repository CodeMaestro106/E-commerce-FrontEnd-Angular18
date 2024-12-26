import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getOrderActionFailure,
  getOrderItemListAction,
  getOrderListAction,
  getOrderListSuccess,
} from './order.actions';
import { OrderService } from './order.service';

@Injectable()
export class CartEffects {
  getCartListEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getOrderListAction),
      tap(() => {
        console.log('cart list effect');
      }),
      switchMap(() =>
        this.orderService.getAllOrderInfo().pipe(
          map((response) => {
            console.log('get cart list ', response);

            const processData = response.map((item) => {
              return this.orderService.transformToOrder(item);
            });

            return getOrderListSuccess({ orders: processData });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Getting Cart info had failed. Please try again.';
            return of(getOrderActionFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  constructor(private orderService: OrderService) {}
}
