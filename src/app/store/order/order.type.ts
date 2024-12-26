import { Product } from '../product/product.type';

export interface Order {
  id: number;
  username: string;
  status: string;
  orderItems: OrderItem[];
  totalAmount: number;
  stripeSessionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  Product: Product;
  createdAt: string;
  updatedAt: string;
}

// Define type for your reducer or selectors.
export interface OrderState {
  orders: Order[];
  error: string | null;
  loading: boolean;
}
