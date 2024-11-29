import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Category } from './category.type';

export const getCategoryListAction = createAction('[CATEGORY] load categories');

export const getCategoryListSuccess = createAction(
  '[CATEGORY] get Category List is success',
  props<{ categories: Category[] }>()
);

export const getCategoryListFailure = createAction(
  '[CATEGORY] get Category List is failure',
  props<{ error: string }>()
);
