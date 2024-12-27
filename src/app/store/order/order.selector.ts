import { orderFeatureKey } from './order.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order, OrderItem, OrderState } from './order.type';

export const selectOrderState =
  createFeatureSelector<OrderState>(orderFeatureKey);

// selector to gett the order items
export const selectOrders = createSelector(
  selectOrderState,
  (state: OrderState) => {
    return state.orders;
  },
);

// export const selectOrderItem = (id: number) =>
//   createSelector(selectOrderState, (state: OrderState) => {
//     const order = state.orders.find((item) => item.id == id);
//     return order?.orderItems;
//   });

// selector to get the loading state
export const selectLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.loading,
);

// selector to get any error message
export const selectError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error,
);
