import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}auth`;
  constructor(private http: HttpClient) {}

  // logout
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }

  login(
    email: string,
    password: string,
  ): Observable<{ result: boolean; msg: string }> {
    return this.http.post<{ result: any; msg: string }>(
      `${this.apiUrl}/login`,
      { email, password },
    );
  }

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<{ username: string; user: any; token: string }> {
    return this.http.post<{ username: string; user: any; token: string }>(
      `${this.apiUrl}/register`,
      { username, email, password },
    );
  }

  verifyOtp(
    email: string,
    otp: string,
  ): Observable<{ user: any; token: string }> {
    return this.http.post<{ user: any; token: string }>(
      `${this.apiUrl}/verify-otp`,
      { email, otp },
    );
  }
}
