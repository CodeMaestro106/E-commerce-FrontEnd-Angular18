import { Category, CategoryState } from './category.type';
import { categoryFeatureKey } from './category.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCategoryState =
  createFeatureSelector<CategoryState>(categoryFeatureKey);

// selector to gett the category items
export const selectCategoryItems = createSelector(
  selectCategoryState,
  (state: CategoryState) => {
    return state.categories;
  }
);

// selector to get the loading state
export const selectLoading = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.loading
);

// selector to get any error message
export const selectError = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.error
);
