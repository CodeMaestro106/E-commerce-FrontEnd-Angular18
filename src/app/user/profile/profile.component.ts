import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthStorageService } from '../../auth/auth.storage.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isUpdateFaild = false;
  errorMessage = '';
  currentUser: any;

  constructor(
    private authStorageService: AuthStorageService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authStorageService.getUser();
  }
  onSubmit(): void {
    const { username, email, password } = this.form;
    this.userService.updateUserInfo({ username, email, password }).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isUpdateFaild = false;

        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.errors;
        this.isUpdateFaild = true;
      },
    });
  }
}
