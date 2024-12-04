import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductState } from './product.type';
import {
  getProductListSuccess,
  actionProductFailure,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
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
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return {
      ...store,
      products: uniqueProductItems,
      loading: false,
      error: null,
    };
  }),

  // create product
  on(createProductSuccess, (store: ProductState, result) => {
    console.log('create product success => ', result);
    const combinedProductItems = [...store.products, result.product];

    return {
      ...store,
      products: combinedProductItems,
      loading: false,
      error: null,
    };
  }),

  // create category
  on(updateProductSuccess, (store: ProductState, result) => {
    console.log('update product success => ', result);
    const products = store.products.map((product) =>
      product.id === result.product.id ? result.product : product,
    );

    return {
      ...store,
      products: products,
      loading: false,
      error: null,
    };
  }),

  // delete category success
  on(deleteProductSuccess, (store: ProductState, result) => {
    const products = store.products.filter(
      (product) => product.id !== result.id,
    );
    console.log('delte product success => ', result);
    return {
      ...store,
      products: products,
      loading: false,
      error: null,
    };
  }),

  on(actionProductFailure, (store: ProductState, result) => {
    return {
      ...store,
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),
);
