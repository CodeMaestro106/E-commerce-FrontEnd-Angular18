import { createAction, props } from '@ngrx/store';

import { Product } from '../product/product.type';

export const getFavoriteListAction = createAction(
  '[Favorite] load products in favorite list',
);

export const getFavoriteListSuccess = createAction(
  '[Favorite] get Favorite List is success',
  props<{ products: Product[] }>(),
);

export const actionFavoriteFailure = createAction(
  '[Favorite]  Action Favorite is failure',
  props<{ error: string }>(),
);

// delete
export const deleteFavoriteAction = createAction(
  '[Favorite] delete product in Favorie list by id',
  props<{ productId: number }>(),
);

export const deleteFavoriteSuccess = createAction(
  '[Favorite] deleting product in FavoriteList is success',
  props<{ productId: number }>(),
);

// add
export const addFavoriteAction = createAction(
  '[Favorite] add Favorite by id',
  props<{ productId: number }>(),
);

export const addFavoriteSuccess = createAction(
  '[Favorite] add Product in FavoriteList is success',
  props<{ product: Product }>(),
);
