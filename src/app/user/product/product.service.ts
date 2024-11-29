import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from './product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.baseUrl}product`;

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

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  constructor(private http: HttpClient) {}
}
