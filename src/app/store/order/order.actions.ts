import { createAction, props } from '@ngrx/store';
import { Order, OrderItem } from './order.type';
// error handle
export const getOrderActionFailure = createAction(
  '[Order] get Order Action is failure',
  props<{ error: string }>(),
);

// get Order info
export const getOrderListAction = createAction('[Order] get all Order info');

export const getOrderListSuccess = createAction(
  '[Order] get Order List is success',
  props<{ orders: Order[] }>(),
);

// get Order Items
export const getOrderItemListAction = createAction(
  '[OrderItem] get OrderItem List',
  props<{ id: number }>(),
);
