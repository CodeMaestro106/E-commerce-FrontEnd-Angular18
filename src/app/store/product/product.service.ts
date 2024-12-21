import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = `${environment.baseUrl}product`;

  transformToProduct(data: any): Product {
    return {
      id: data.id,
      stripe_product_id: data.stripe_product_id,
      name: data.name,
      description: data.description,
      price: data.price,
      priceId: data.priceId,
      stock: data.stock, // Convert stock to string
      imgUrl: data.imgUrl,
      category: data.Category?.name || '', // Use Category name, fallback to empty string
      categoryId: data.categoryId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }

  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseURL}`, product);
  }

  updateProduct(id: number, product: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.baseURL}/${id}`);
  }

  // user
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }

  constructor(private http: HttpClient) {}
}
