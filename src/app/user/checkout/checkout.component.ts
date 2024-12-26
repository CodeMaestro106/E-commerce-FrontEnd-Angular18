import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgxStripeModule,
  StripeCardComponent,
  StripeCardNumberComponent,
  StripeService,
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { AuthStorageService } from '../../auth/auth.storage.service';

import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../store/user-cart/cart.selectors';

import { Location } from '@angular/common';
import { CheckoutService } from '../../store/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxStripeModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  public userName = '';
  public userEmail = '';
  public totalPrice = 0;
  totalPrice$: Observable<number> = new Observable<number>();

  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '20px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paymentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
    private authStorageService: AuthStorageService,
    private toastService: ToastrService,
    private checkoutService: CheckoutService,
    private store: Store,
    private location: Location,
  ) {}

  ngOnInit() {
    const user = this.authStorageService.getUser();
    this.userEmail = user.email;
    this.userName = user.username;

    // get cart Total price
    this.totalPrice$ = this.store.select(selectCartTotalPrice);
    this.totalPrice$.subscribe((num) => (this.totalPrice = num));
  }

  // Using paymnet Intent
  // pay(): void {
  //   if (this.paymentForm.valid) {
  //     const { name, amount } = this.paymentForm.value;
  //     console.log(amount);
  //     this.createPaymentIntent(amount)
  //       .pipe(
  //         switchMap((pi: any) => {
  //           return this.stripeService.confirmCardPayment(pi.clientSecret, {
  //             payment_method: {
  //               card: this.card.element,
  //               billing_details: {
  //                 name: name,
  //               },
  //             },
  //           });
  //         }),
  //       )
  //       .subscribe((result) => {
  //         if (result.error) {
  //           // Show error to your customer (e.g., insufficient funds)
  //           this.toastService.error(result.error.message, 'Error');
  //         } else {
  //           // The payment has been processed!
  //           if (result.paymentIntent.status === 'succeeded') {
  //             // Show a success message to your customer
  //             this.toastService.success('Payment successful', 'Success');
  //           }
  //         }
  //       });
  //   } else {
  //     console.log(this.paymentForm.valid);
  //   }
  // }

  pay(): void {
    if (this.paymentForm.valid) {
      this.store.select(selectCartItems).subscribe((cartItmes) => {
        console.log('checkout cartItmes', cartItmes);
        if (!cartItmes || cartItmes.length == 0) {
          return;
        }
        this.checkoutService.checkout(cartItmes);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
