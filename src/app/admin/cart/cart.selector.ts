import { Cart, CartState } from './cart.type';
import { cartFeatureKey } from './cart.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

// selector to gett the Cart items
export const selectCarts = createSelector(
  selectCartState,
  (state: CartState) => {
    return state.carts;
  },
);

export const selectCartItem = (id: number) =>
  createSelector(selectCartState, (state: CartState) => {
    const cart = state.carts.find((item) => item.id == id);
    return cart?.cartItems;
  });

// selector to get the loading state
export const selectLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading,
);

// selector to get any error message
export const selectError = createSelector(
  selectCartState,
  (state: CartState) => state.error,
);
