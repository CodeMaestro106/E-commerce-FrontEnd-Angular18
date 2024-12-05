import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

import {
  selectUser,
  selectAuthState,
  selectLoading,
  selectAuthError,
} from '../../auth/auth.selectors';
import { map, of } from 'rxjs';
import { login } from '../../auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { AuthStorageService } from '../../auth/auth.storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isAuthenicated$: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  loading$: Observable<boolean>;
  email$: Observable<any>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private authStorageService: AuthStorageService,
    private router: Router,
  ) {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectAuthError);

    this.email$ = this.store
      .select(selectUser)
      .pipe(map((user) => user?.email));

    if (this.email$ == null) {
      this.isAuthenicated$ = false;
    }
  }

  ngOnInit(): void {
    if (this.authStorageService.getUser()) {
      // User is logged in, redirect to dashboard or some other page
      this.router.navigate(['admin/dashboard']); // Redirect to dashboard, for example
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(password);
      this.store.dispatch(login({ email, password }));
    }
  }
}
