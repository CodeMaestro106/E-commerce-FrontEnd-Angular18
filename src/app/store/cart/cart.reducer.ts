import { createFeature, createReducer, on } from '@ngrx/store';
import { CartState } from './cart.type';
import { getCartListSuccess, getCartActionFailure } from './cart.actions';

export const cartFeatureKey = 'cart';

export const initialState: CartState = {
  carts: [],
  error: '',
  loading: false,
};

export const cartReducer = createReducer(
  initialState,
  // get cart list
  on(getCartListSuccess, (store: CartState, result) => {
    const combinedCartItems = [...store.carts, ...result.carts];
    alert(combinedCartItems);
    // Filter for unique items based on `id`
    const uniqueCartItems = combinedCartItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return {
      ...store,
      carts: uniqueCartItems,
      loading: false,
      error: null,
    };
  }),

  on(getCartActionFailure, (store: CartState, result) => {
    return {
      ...store,
      result, // Update the cartItems with the new list
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),
);
