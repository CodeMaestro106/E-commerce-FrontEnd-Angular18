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
export class OrderEffects {
  getOrderListEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getOrderListAction),
      tap(() => {
        console.log('Order list effect');
      }),
      switchMap(() =>
        this.orderService.getAllOrderInfo().pipe(
          map((response) => {
            console.log('get Order list ', response);

            return getOrderListSuccess({ orders: response });
          }),
          catchError((error) => {
            console.log(error.error);
            const errorMessage =
              error?.error?.msg ||
              'Getting Order info had failed. Please try again.';
            return of(getOrderActionFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  constructor(private orderService: OrderService) {}
}
