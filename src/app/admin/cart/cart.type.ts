import { Product } from '../product/product.type';

export interface Cart {
  id: number;
  username: string;
  status: string;
  cartItems: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  Product: Product;
  createdAt: string;
  updatedAt: string;
}

// Define type for your reducer or selectors.
export interface CartState {
  carts: Cart[];
  error: string | null;
  loading: boolean;
}
