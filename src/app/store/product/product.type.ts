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

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
