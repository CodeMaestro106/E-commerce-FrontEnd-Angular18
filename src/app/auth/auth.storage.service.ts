import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { USER_TOKEN_KEY, USER_KEY } from './auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor() {}

  // clean session storage by removing the user-token-key
  clean(): void {
    window.sessionStorage.removeItem(USER_KEY);
  }

  // redirect page
  reloadPage(): void {
    window.location.reload();
  }

  // Save user info in session storage
  public saveUser(user: any): void {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public storeTokens(accessToken: string, refreshToken: string): void {
    const user = JSON.parse(window.sessionStorage.getItem(USER_KEY) || '{}');
    user.refreshToekn = refreshToken;
    user.accessToken = accessToken;
  }

  //Decode the JWT token and check its expiration time
  public isTokenExpired(): boolean {
    if (!this.getUser()) {
      return false;
    }
    const token = this.getUser().token;
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds
      if (decoded.exp < currentTime) {
        return true; // Token has expired
      }
      return false; // Token is valid
    } catch (error) {
      return true; // Error decoding token, likely expired or malformed
    }
  }

  public getUserRole(): any {
    const user = this.getUser();
    if (!user) return null;

    try {
      const decoded: any = jwtDecode(user.token);
      return decoded.role;
    } catch (error) {
      return null;
    }
  }

  public getRefreshToken(): any {
    const user = this.getUser();

    return user ? user.refreshToken : null;
  }

  // Return user information from session storage
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // if user, return true and if not, return false
  public isLoggedIn(): boolean {
    return !!window.sessionStorage.getItem(USER_KEY);
  }
}
