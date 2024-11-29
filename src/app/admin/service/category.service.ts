import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryResponse } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseURL = `${environment.baseUrl}category`;

  constructor(private httpClient: HttpClient) {}

  getCategoryList(): Observable<CategoryResponse> {
    console.log(this.baseURL);

    return this.httpClient.get<CategoryResponse>(`${this.baseURL}`);
  }

  createCategory(Category: Category): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, Category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseURL}/${id}`);
  }

  updateCategory(id: number, Category: Category): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, Category);
  }

  deleteCategory(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
