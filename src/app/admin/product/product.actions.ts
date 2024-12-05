import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Product } from './product.type';

export const getProductListAction = createAction('[PRODUCT] load products');

export const getProductListSuccess = createAction(
  '[PRODUCT] get Product List is success',
  props<{ products: Product[] }>(),
);

export const actionProductFailure = createAction(
  '[PRODUCT]  Action product is failure',
  props<{ error: string }>(),
);

// delete
export const deleteProductAction = createAction(
  '[Product] delete Product by id',
  props<{ id: number }>(),
);

export const deleteProductSuccess = createAction(
  '[Product] delete Product  is success',
  props<{ id: number }>(),
);

// edit
export const updateProductAction = createAction(
  '[Product] update Product by id',
  props<{ id: number; product: FormData }>(),
);

export const updateProductSuccess = createAction(
  '[Product] update Product  is success',
  props<{ product: Product }>(),
);

// create
export const createProductAction = createAction(
  '[Product] create Product by id',
  props<{ product: FormData }>(),
);

export const createProductSuccess = createAction(
  '[Product] create Product  is success',
  props<{ product: Product }>(),
);
