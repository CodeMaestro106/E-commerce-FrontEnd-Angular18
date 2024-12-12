import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthStorageService } from '../auth/auth.storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStorageService: AuthStorageService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = this.authStorageService.getUserRole(); // Retrieve token from your storage service

    if (!userRole) {
      // If no token exists, redirect to login
      this.router.navigate(['']);
      return false;
    }

    try {
      // Check if the route has a required role
      const requiredRole = next.data['role'];
      if (requiredRole && userRole !== requiredRole) {
        // If the user's role doesn't match the required role, redirect to access denied
        this.router.navigate(['']);
        return false;
      }

      // If everything is fine, allow access
      return true;
    } catch (error) {
      alert(error);
      // If token is invalid, redirect to login
      this.router.navigate(['']);
      return false;
    }
  }
}
