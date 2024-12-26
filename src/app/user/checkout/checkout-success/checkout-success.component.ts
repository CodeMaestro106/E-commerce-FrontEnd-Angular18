import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../store/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout-success',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss',
})
export class CheckoutSuccessComponent {
  sessionId: string | null = null;
  orderItems: any;
  totalAmount: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    console.log('checkout success ng on Init');

    this.sessionId = this.route.snapshot.params['session_id'];
    console.log(this.sessionId);
    if (this.sessionId) {
      this.fetchOrderDetails(this.sessionId);
    }
  }

  fetchOrderDetails(sessionId: string) {
    this.orderService.getOrderBySessionId(sessionId).subscribe((data) => {
      console.log('get Order by sessiont id result =>', data);
      this.orderItems = data.OrderItems;
      this.totalAmount = data.totalAmount;
      console.log(this.totalAmount);
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
