import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { AuthStorageService } from '../auth/auth.storage.service';

const API_URL = 'http://localhost:5000/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private storageService: AuthStorageService,
  ) {}

  // Handel errors
  private handleError(error: any): Observable<never> {
    console.error('user info error =>', error);
    throw error; // Or you can return an observable with a friendly error message
  }

  // Get user information
  getUserInfo(): Observable<any> {
    return this.http.get(`${API_URL}/info`).pipe(catchError(this.handleError));
  }

  // Update user information
  updateUserInfo(userData: any): Observable<any> {
    return this.http
      .put(`${API_URL}/info`, userData)
      .pipe(catchError(this.handleError));
  }

  // Admin: Get all users
  getAllUsers(): Observable<any> {
    return this.http
      .get(`${API_URL}/all-users`)
      .pipe(catchError(this.handleError));
  }

  // Admin: Update user by admin
  updateUserByAdmin(userId: string, userData: any): Observable<any> {
    return this.http
      .put(`${API_URL}/all-users/${userId}`, userData)
      .pipe(catchError(this.handleError));
  }

  // Admin: Delete user by admin
  deleteUserByAdmin(userId: string): Observable<any> {
    return this.http
      .delete(`${API_URL}/all-users/${userId}`)
      .pipe(catchError(this.handleError));
  }
}
