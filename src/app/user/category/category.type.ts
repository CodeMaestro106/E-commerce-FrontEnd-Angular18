export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
