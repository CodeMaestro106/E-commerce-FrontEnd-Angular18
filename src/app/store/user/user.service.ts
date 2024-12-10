import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.baseUrl}user/all-users`;

  // Handel errors
  private handleError(error: any): Observable<never> {
    console.error('user info error =>', error);
    throw error; // Or you can return an observable with a friendly error message
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  deleteUser(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.apiUrl}/${id}`);
  }

  // Get user information
  getUserInfo(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/info`)
      .pipe(catchError(this.handleError));
  }

  // Update user information
  updateUserInfo(userData: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/info`, userData)
      .pipe(catchError(this.handleError));
  }

  // Admin: Get all users
  getAllUsers(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/all-users`)
      .pipe(catchError(this.handleError));
  }

  // Admin: Update user by admin
  updateUserByAdmin(userId: string, userData: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/all-users/${userId}`, userData)
      .pipe(catchError(this.handleError));
  }

  // Admin: Delete user by admin
  deleteUserByAdmin(userId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/all-users/${userId}`)
      .pipe(catchError(this.handleError));
  }

  constructor(private http: HttpClient) {}
}
