import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  stripePromise = loadStripe(environment.stripe.publicKey);

  private apiUrl = `${environment.baseUrl}pay`;

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
  ) {}

  checkout(cartItems: any[]) {
    this.stripePromise.then((stripe) => {
      if (!stripe) {
        console.error('Stripe failed to load');
        this.toastService.error('Stripe failed to load', 'Error');
        return;
      }
      // Call the backend to create a checkout session
      this.http
        .post<{
          id: string;
        }>(`${this.apiUrl}/create-checkout-session`, { cartItems: cartItems })
        .subscribe({
          next: async (session) => {
            await stripe.redirectToCheckout({ sessionId: session.id });
          },
          error: (error) => {
            const errorMessage =
              error?.error?.msg ||
              'Adding User info had failed. Please try again.';

            this.toastService.error(errorMessage, 'Error');
          },
        });
    });
  }
}
