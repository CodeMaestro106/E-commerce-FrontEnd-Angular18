import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductState } from './product.type';
import {
  getProductListAction,
  getProductListSuccess,
  getProductListFailure,
} from './product.actions';

export const productFeatureKey = 'product';

export const initialState: ProductState = {
  products: [],
  error: '',
  loading: false,
};

export const productReducer = createReducer(
  initialState,
  // get product list
  on(getProductListSuccess, (store: ProductState, result) => {
    
    const combinedProductItems = [...store.products, ...result.products];
    // Filter for unique items based on `id`
    const uniqueProductItems = combinedProductItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );
    return {
      ...store,
      products: uniqueProductItems,
      loading: false,
      error: null,
    };
  }),

  on(getProductListFailure, (store: ProductState, result) => {
    return {
      ...store,
      result, // Update the cartItems with the new list
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  })
);
