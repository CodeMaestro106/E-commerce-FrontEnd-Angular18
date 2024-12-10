import { Product } from '../product/product.type';

export interface FavoriteState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
