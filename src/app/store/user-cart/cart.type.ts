// Define the types for the login and user information
export interface CartItem {
  id: string;
  quantity: number;
  Product: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  imgUrl: string;
  categoryId: string;
}

// Define type for your reducer or selectors.
export interface CartState {
  cartItems: CartItem[];
  error: string | null;
  loading: boolean;
}
