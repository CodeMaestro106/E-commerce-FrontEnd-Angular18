export class Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  imgUrl: string;
  category: string;
  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    price: string = '',
    stock: string = '',
    imgUrl: string = '',
    category: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.imgUrl = imgUrl;
    this.category = category;
  }
}
export interface ProductResponse {
  products: Product[];
}
