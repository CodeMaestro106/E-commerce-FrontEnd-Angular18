import { Product, ProductState } from './product.type';
import { productFeatureKey } from './product.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectProductState =
  createFeatureSelector<ProductState>(productFeatureKey);

// selector to gett the Product items
export const selectProductItems = createSelector(
  selectProductState,
  (state: ProductState) => {
    return state.products;
  },
);

// selector to get the loading state
export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading,
);

// selector to get any error message
export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error,
);

// selector to get a selected Product Item
export const selectedProductItem = (productId: number) =>
  createSelector(selectProductState, (state: ProductState) => {
    const product: Product | undefined = state.products.find((product) => {
      return product.id == productId;
    });
    // alert(productId);
    return product;
  });
