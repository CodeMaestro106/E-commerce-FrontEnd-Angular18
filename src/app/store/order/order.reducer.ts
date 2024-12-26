import { createFeature, createReducer, on } from '@ngrx/store';

import { getOrderListSuccess, getOrderActionFailure } from './order.actions';
import { OrderState } from './order.type';

export const orderFeatureKey = 'order';

export const initialState: OrderState = {
  orders: [],
  error: '',
  loading: false,
};

export const orderReducer = createReducer(
  initialState,
  // get order list
  on(getOrderListSuccess, (store: OrderState, result) => {
    const combinedOrderItems = [...store.orders, ...result.orders];
    // Filter for unique items based on `id`
    const uniqueOrderItems = combinedOrderItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return {
      ...store,
      orders: uniqueOrderItems,
      loading: false,
      error: null,
    };
  }),

  on(getOrderActionFailure, (store: OrderState, result) => {
    return {
      ...store,
      result, // Update the orderItems with the new list
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),
);
