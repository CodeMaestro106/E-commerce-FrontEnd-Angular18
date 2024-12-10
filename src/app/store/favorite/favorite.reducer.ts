import { createFeature, createReducer, on } from '@ngrx/store';

import { FavoriteState } from './favorite.type';
import {
  getFavoriteListSuccess,
  actionFavoriteFailure,
  addFavoriteSuccess,
  deleteFavoriteSuccess,
} from './favorite.actions';

export const favoriteFeatureKey = 'favorite';

export const initialState: FavoriteState = {
  products: [],
  error: '',
  loading: false,
};

export const favoriteReducer = createReducer(
  initialState,
  // get product list
  on(getFavoriteListSuccess, (store: FavoriteState, result) => {
    const combinedProductItems = [...store.products, ...result.products];
    // Filter for unique items based on `id`
    const uniqueProductItems = combinedProductItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return {
      ...store,
      products: uniqueProductItems,
      loading: false,
      error: null,
    };
  }),

  // add product in Favorite List
  on(addFavoriteSuccess, (store: FavoriteState, result) => {
    console.log('add product success => ', result);
    const combinedProductItems = [...store.products, result.product];

    return {
      ...store,
      products: combinedProductItems,
      loading: false,
      error: null,
    };
  }),

  // delete category success
  on(deleteFavoriteSuccess, (store: FavoriteState, result) => {
    const products = store.products.filter(
      (product) => product.id !== result.productId,
    );
    console.log('delte product success => ', result);
    return {
      ...store,
      products: products,
      loading: false,
      error: null,
    };
  }),

  on(actionFavoriteFailure, (store: FavoriteState, result) => {
    return {
      ...store,
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),
);
