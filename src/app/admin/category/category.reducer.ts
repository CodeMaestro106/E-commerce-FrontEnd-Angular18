import { createFeature, createReducer, on } from '@ngrx/store';
import { CategoryState } from './category.type';
import {
  getCategoryListSuccess,
  categoryActionFailure,
  createCategorySuccess,
  updateCategorySuccess,
  deleteCategorySuccess,
} from './category.actions';
import { result, update } from 'lodash';

export const categoryFeatureKey = 'category';

export const initialState: CategoryState = {
  categories: [],
  error: '',
  loading: false,
};

export const categoryReducer = createReducer(
  initialState,
  // get category list
  on(getCategoryListSuccess, (store: CategoryState, result) => {
    const combinedCategoryItems = [...store.categories, ...result.categories];
    // Filter for unique items based on `id`
    const uniqueCategoryItems = combinedCategoryItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return {
      ...store,
      categories: uniqueCategoryItems,
      loading: false,
      error: null,
    };
  }),

  // create category
  on(createCategorySuccess, (store: CategoryState, result) => {
    const combinedCategoryItems = [...store.categories, result.category];

    return {
      ...store,
      categories: combinedCategoryItems,
      loading: false,
      error: null,
    };
  }),

  // create category
  on(updateCategorySuccess, (store: CategoryState, result) => {
    console.log(result);
    const categories = store.categories.map((category) =>
      category.id === result.category.id ? result.category : category,
    );

    return {
      ...store,
      categories: categories,
      loading: false,
      error: null,
    };
  }),

  // delete category success
  on(deleteCategorySuccess, (store: CategoryState, result) => {
    const categories = store.categories.filter(
      (category) => category.id !== result.id,
    );
    return {
      ...store,
      categories: categories,
      loading: false,
      error: null,
    };
  }),

  on(categoryActionFailure, (store: CategoryState, result) => {
    return {
      ...store,
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),
);
