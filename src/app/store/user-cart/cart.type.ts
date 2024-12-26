// Define the types for the login and user information
export interface CartItem {
  id: string;
  quantity: number;
  Product: Product;
}

export interface Product {
  id: number;
  stripeProductId: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  priceId: string;
  imgUrl: string;
  category: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

// Define type for your reducer or selectors.
export interface CartState {
  cartItems: CartItem[];
  error: string | null;
  loading: boolean;
}
