import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product.type';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseURL = `${environment.baseUrl}favorite`;

  getFavoriteList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }

  addProductToFavorite(id: number): Observable<{ product: Product }> {
    return this.http.post<{ product: Product }>(`${this.baseURL}/${id}`, {
      id: id,
    });
  }

  deleteProductInFavorite(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.baseURL}/${id}`);
  }

  constructor(private http: HttpClient) {}
}
