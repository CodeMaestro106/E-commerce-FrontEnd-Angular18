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
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock.toString(), // Convert stock to string
      imgUrl: `http://localhost:5000/${data.imgUrl.replace(/\\/g, '/')}`,
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
    return this.http.put<Product>(`${this.baseURL}/${id}`, {
      product: product,
    });
  }

  deleteProduct(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.baseURL}/${id}`);
  }

  constructor(private http: HttpClient) {}
}
