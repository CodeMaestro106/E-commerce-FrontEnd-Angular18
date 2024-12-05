import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Category } from './category.type';

export const getCategoryListAction = createAction('[Category] load categories');

export const getCategoryListSuccess = createAction(
  '[Category] get Category List is success',
  props<{ categories: Category[] }>(),
);

export const categoryActionFailure = createAction(
  '[Category] category action is failure',
  props<{ error: string }>(),
);

// delete
export const deleteCategoryAction = createAction(
  '[Category] delete category by id',
  props<{ id: number }>(),
);

export const deleteCategorySuccess = createAction(
  '[Category] delete Category  is success',
  props<{ id: number }>(),
);

// edit
export const updateCategoryAction = createAction(
  '[Category] update category by id',
  props<{ id: number; name: string }>(),
);

export const updateCategorySuccess = createAction(
  '[Category] update Category  is success',
  props<{ category: Category }>(),
);

// create
export const createCategoryAction = createAction(
  '[Category] create category by id',
  props<{ category: Category }>(),
);

export const createCategorySuccess = createAction(
  '[Category] create Category  is success',
  props<{ category: Category }>(),
);
