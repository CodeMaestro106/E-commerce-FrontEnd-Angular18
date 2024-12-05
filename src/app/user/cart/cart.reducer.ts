import { createReducer, on } from '@ngrx/store';
import { CartItem, CartState, Product } from './cart.type';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export const initialState: CartState = {
  cartItems: [],
  error: '',
  loading: false,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.itemAddedFailure, (store: CartState, result) => {
    return {
      ...store,
      loading: false, // Set loading to false as the data has been loaded
      error: result.error,
    };
  }),

  // get Item from cart reducer
  on(CartActions.getItemsInCartSuccess, (store: CartState, result) => {
    console.log(result);
    const getCartItems = result.cartitems.map((item) => {
      const product: Product = {
        id: item.Product.id,
        name: item.Product.name,
        description: item.Product.description,
        stock: item.Product.stock,
        price: item.Product.price,
        imgUrl: `http://localhost:5000/${item.Product.imgUrl.replace(
          /\\/g,
          '/',
        )}`,
        categoryId: item.Product.categoryId,
      };
      return {
        id: item.id,
        quantity: item.quantity,
        Product: product,
      };
    });

    const combinedCartItems = [...store.cartItems, ...getCartItems];

    // Filter for unique items based on `id`
    const uniqueCartItems = combinedCartItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return {
      ...store,
      cartItems: uniqueCartItems,
      // cartItems: result.cartitems, // Update the cartItems with the new list
      loading: false, // Set loading to false as the data has been loaded
      error: null, // Reset the error state (if any)
    };
  }),

  on(CartActions.getItemsInCartFailure, (store: CartState, result) => {
    return {
      ...store,
      result, // Update the cartItems with the new list
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),

  on(CartActions.reduceNumItemInCart, (store: CartState, result) => {
    console.log(result.cartItem);
    return {
      ...store,
      cartItems: store.cartItems
        .map((cartItem) =>
          cartItem.id !== result.cartItem.id
            ? cartItem
            : {
                ...cartItem,
                quantity: cartItem.quantity == 1 ? 1 : cartItem.quantity - 1,
              },
        )
        .filter(({ quantity }) => quantity > 0),
      loading: false,
      error: null,
    };
  }),
  on(CartActions.increaseNumItemInCart, (store: CartState, result) => {
    return {
      ...store,
      cartItems: store.cartItems
        .map((cartItem) =>
          cartItem.id !== result.cartItem.id
            ? cartItem
            : {
                ...cartItem,
                quantity:
                  cartItem.quantity < cartItem.Product.stock
                    ? cartItem.quantity + 1
                    : cartItem.quantity,
              },
        )
        .filter(({ quantity }) => quantity > 0),
      loading: false,
      error: null,
    };
  }),

  on(CartActions.removeItemInCart, (store: CartState, result) => {
    const cartItems = [
      ...store.cartItems.filter((item) => item.id !== result.cartItem.id),
    ];
    return {
      cartItems: cartItems,
      loading: false,
      error: null,
    };
  }),
);
