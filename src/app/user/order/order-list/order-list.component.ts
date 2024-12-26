import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../store/order/order.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  orders: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    console.log('Order List ng on Init');

    if (this.orders.length === 0) {
      this.fetchOrderLists();
    }
  }

  fetchOrderLists() {
    this.orderService.getOrdersByUser().subscribe((data) => {
      console.log('get Order by sessiont id result =>', data);
      this.orders = data;
      console.log(this.orders);
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  orderDetails(session_id: string) {
    this.router.navigate(['check-out/success/', session_id]);
  }
}
