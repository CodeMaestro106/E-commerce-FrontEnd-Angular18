import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Product } from './product.type';

export const getProductListAction = createAction('[PRODUCT] load categories');

export const getProductListSuccess = createAction(
  '[PRODUCT] get Product List is success',
  props<{ products: Product[] }>()
);

export const getProductListFailure = createAction(
  '[PRODUCT] get Product List is failure',
  props<{ error: string }>()
);
