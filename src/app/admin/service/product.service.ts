import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductResponse } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = `${environment.baseUrl}product`;

  constructor(private httpClient: HttpClient) {}

  transformToProduct(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock.toString(), // Convert stock to string
      imgUrl: `http://localhost:5000/${data.imgUrl.replace(/\\/g, '/')}`,
      category: data.Category?.name || '', // Use Category name, fallback to empty string
    };
  }

  getProductList(): Observable<any[]> {

    return this.httpClient.get<any[]>(`${this.baseURL}`);
  }

  createProduct(productFormData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, productFormData);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseURL}/${id}`);
  }

  updateProduct(id: number, productFormData: FormData): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, productFormData);
  }

  deleteProduct(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
