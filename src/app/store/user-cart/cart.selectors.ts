import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem, CartState } from './cart.type';
import { cartFeatureKey } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

// Selector to get the cart items
export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => {
    return state.cartItems;
  },
);

export const selectCartItemsCount = createSelector(
  selectCartState,
  (state: CartState) => {
    return state.cartItems.length;
  },
);

// 2. Selector to get the loading state (whether cart items are being fetched)
export const selectLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading, // Access the loading state
);

// 3. Selector to get any error message
export const selectError = createSelector(
  selectCartState,
  (state: CartState) => state.error, // Access the error state
);

// 4. Selector to get Total Price
export const selectCartTotalPrice = createSelector(
  selectCartState,
  (state: CartState) => {
    return state.cartItems.reduce((accumulator: number, cartItem: CartItem) => {
      return accumulator + cartItem.quantity * cartItem.Product.price;
    }, 0);
  },
);
