import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectUser,
  selectLoading,
  selectAuthError,
} from '../../auth/auth.selectors';
import { AuthStorageService } from '../../auth/auth.storage.service';
import { register } from '../../auth/auth.actions';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error$: Observable<string | null>;
  loading$: Observable<boolean>;
  isAuthenicated$: boolean = true;

  email: string = '';

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
  });

  constructor(
    private store: Store,
    private authStoreService: AuthStorageService,
  ) {
    if (authStoreService.getUser()) {
      this.isAuthenicated$ = false;
    }

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    if (this.authStoreService.getUser()) {
      this.email = this.authStoreService.getUser();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password, username } = this.registerForm.value;
      this.store.dispatch(register({ username, email, password }));
    }
  }
}
