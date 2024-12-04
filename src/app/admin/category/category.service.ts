import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from './category.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseURL = `${environment.baseUrl}category`;

  constructor(private httpClient: HttpClient) {}

  getCategoryList(): Observable<Category[]> {
    console.log(this.baseURL);

    return this.httpClient.get<Category[]>(`${this.baseURL}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.baseURL}`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseURL}/${id}`);
  }

  updateCategory(id: number, name: string): Observable<Category> {
    return this.httpClient.put<Category>(`${this.baseURL}/${id}`, {
      name: name,
    });
  }

  deleteCategory(id: number): Observable<{ id: number }> {
    return this.httpClient.delete<{ id: number }>(`${this.baseURL}/${id}`);
  }
}
