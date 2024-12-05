import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { BehaviorSubject } from 'rxjs';
import { AuthStorageService } from './auth/auth.storage.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular-19-E-Commerce-Frontend-APP-with-NGRX';
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  role$ = new BehaviorSubject<string>('USER');

  constructor(private authStorageService: AuthStorageService) {}

  ngOnInit(): void {
    const user = this.authStorageService.getUser();

    if (user) {
      const decodedToken: any = jwtDecode(user.token);
      const newRole = decodedToken.role || '';
      this.role$.next(newRole);
      this.isLoggedIn$.next(true);
    }
  }
}
