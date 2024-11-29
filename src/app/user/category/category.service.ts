import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from './category.type';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.baseUrl}category`;

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }
}
