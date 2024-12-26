import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.type';

/*
 Cart Action 
*/
// Define the action for login

export const addItemInCart = createAction(
  '[CART] add new Item in cart',
  props<{ productId: number; quantity: number }>(),
);

export const itemAddedSuccess = createAction(
  '[CART] Item added to cart successfully', // Action type, usually scoped to a feature like 'Auth'
  props<{ cartItem: CartItem }>(), // Payload for login credentials
);

export const itemAddedFailure = createAction(
  '[CART] Item added to cart failure', // Action type, usually scoped to a feature like 'Auth'
  props<{ error: string }>(), // Payload for login credentials
);

export const getItemsInCart = createAction(
  '[CART] get Cart Items from database',
);

export const getItemsInCartSuccess = createAction(
  '[CART] get Cart Items from database success',
  props<{ cartitems: CartItem[] }>(),
);
export const getItemsInCartFailure = createAction(
  '[Cart] Get Cart Items Failure',
  props<{ error: string }>(),
);

// Action for failed login attempt
export const removeItemInCart = createAction(
  '[CART] Remove item from cart',
  props<{ cartItem: CartItem }>(), // Payload for the error message
);

/*
Cart page Action
*/

// Action for successful login
export const reduceNumItemInCart = createAction(
  '[CART] Reduce number of item in cart',
  props<{ cartItem: CartItem }>(), // Payload containing user data and auth token
);

// Action for failed login attempt
export const increaseNumItemInCart = createAction(
  '[CART] Increase number of item in cart',
  props<{ cartItem: CartItem }>(), // Payload for the error message
);

// New Action for Navigation
export const navigateToCart = createAction('[Cart] Navigate to Cart');
