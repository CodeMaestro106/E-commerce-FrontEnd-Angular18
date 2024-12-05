import { createFeature, createReducer, on } from '@ngrx/store';
import { CategoryState } from './category.type';
import {
  getCategoryListSuccess,
  getCategoryListFailure,
} from './category.actions';

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
    alert(result);
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

  on(getCategoryListFailure, (store: CategoryState, result) => {
    return {
      ...store,
      result, // Update the cartItems with the new list
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),
);
