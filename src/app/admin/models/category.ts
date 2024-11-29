export class Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  constructor(
    id: number = 0,
    name: string = '',
    createdAt: string = '',
    updatedAt: string = ''
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export interface CategoryResponse {
  categories: Category[];
}
