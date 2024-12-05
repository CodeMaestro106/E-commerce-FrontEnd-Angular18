import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.baseUrl}user/all-users`;

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  deleteUser(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.apiUrl}/${id}`);
  }

  constructor(private http: HttpClient) {}
}
