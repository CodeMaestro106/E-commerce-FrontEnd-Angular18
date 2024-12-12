import { Product } from '../product/product.type';
import { favoriteFeatureKey } from './favorite.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorite.type';

export const selectFavoriteState =
  createFeatureSelector<FavoriteState>(favoriteFeatureKey);

// selector to gett the Product items
export const selectProductsInFavoriteList = createSelector(
  selectFavoriteState,
  (state: FavoriteState) => {
    return state.products;
  },
);

export const selectProductsInFavoriteListCount = createSelector(
  selectFavoriteState,
  (state: FavoriteState) => {
    return state.products.length;
  },
);

// selector to get the loading state
export const selectLoading = createSelector(
  selectFavoriteState,
  (state: FavoriteState) => state.loading,
);

// selector to get any error message
export const selectError = createSelector(
  selectFavoriteState,
  (state: FavoriteState) => state.error,
);

// selector to check if product is in wishlist or not
export const selectCheckProductInWishList = (id: number) =>
  createSelector(selectFavoriteState, (state: FavoriteState) => {
    const product = state.products.find((item) => item.id == id);
    return product ? true : false;
  });
