import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  selectAuthState,
  selectCheckAuthenticate,
  selectUser,
} from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import { AuthStorageService } from '../../auth/auth.storage.service';
import { AuthService } from '../../store/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private roles: string[] = ['ADMIN', 'USER'];
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  username?: string;
  role?: string;

  constructor(
    private store: Store,
    private authStorageService: AuthStorageService,
  ) {
    console.log('header contructure');
  }

  ngOnInit(): void {
    const user = this.authStorageService.getUser();

    if (user) {
      const decodedToken: any = jwtDecode(user.token);
      this.role = decodedToken.role || null;

      this.username = user.username;
      this.isLoggedIn$.next(true);
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.isLoggedIn$.next(false);
  }
}
