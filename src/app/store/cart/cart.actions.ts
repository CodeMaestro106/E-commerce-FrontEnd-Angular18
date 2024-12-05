import { createAction, props } from '@ngrx/store';
import { Cart, CartItem } from './cart.type';
// error handle
export const getCartActionFailure = createAction(
  '[Cart] get Cart Action is failure',
  props<{ error: string }>(),
);

// get cart info
export const getCartListAction = createAction('[Cart] get all cart info');

export const getCartListSuccess = createAction(
  '[Cart] get Cart List is success',
  props<{ carts: Cart[] }>(),
);

// get cart Items
export const getCartItemListAction = createAction(
  '[CartItem] get CartItem List',
  props<{ id: number }>(),
);
