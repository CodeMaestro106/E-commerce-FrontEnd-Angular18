import { Component, viewChildren } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthAction from '../../auth/auth.actions';
import { constant } from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';

import { selectAuthError } from '../../auth/auth.selectors';
@Component({
  selector: 'app-otp',
  standalone: false,
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  email: string = '';
  otp: string = '';
  otpForm!: FormGroup;

  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit() {
    const state = history.state;
    this.email = state.email;
    // Initialize the form group
    this.otpForm = this.fb.group({
      first: [''],
      second: [''],
      third: [''],
      fourth: [''],
      fifth: [''],
      sixth: [''],
    });
  }

  onPaste(event: ClipboardEvent) {
    // Prevent the default paste action
    event.preventDefault();

    // Get the pasted text (OTP string)
    const pasteData = event.clipboardData?.getData('text') || '';

    // Ensure the pasted string has exactly 6 characters
    if (pasteData.length === 6) {
      // Distribute the characters to each form control
      const otpControls = Object.keys(this.otpForm.controls);
      otpControls.forEach((control, index) => {
        this.otpForm.controls[control].setValue(pasteData[index]);
      });
    } else {
      console.error('Invalid OTP length. Please paste a 6-digit OTP.');
    }
  }

  onKeydown(event: KeyboardEvent, index: number) {}

  getOtp(): string {
    // Extract values from the form
    const otpValues = this.otpForm.value;
    const otp = Object.values(otpValues).join('');
    console.log('OTP:', otp); // Output the OTP
    // alert(otp);
    return otp;
  }

  login() {
    const otp = this.getOtp();
    this.store.dispatch(AuthAction.verifyOtp({ email: this.email, otp: otp }));
  }
}
