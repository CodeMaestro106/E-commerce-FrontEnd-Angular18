import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { OrderItem } from '../../../store/order/order.type';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injector } from '@angular/core';

import { BaseComponent } from '../../../common/base/BaseComponent';

import { OrderService } from '../../../store/order/order.service';

@Component({
  selector: 'order-detail',
  standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent extends BaseComponent implements OnInit {
  id: number = 0;
  orderItems: OrderItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private orderService: OrderService,
    injector: Injector,
  ) {
    super(injector);
    this.id = this.route.snapshot.params['id'];

    console.log(this.id);

    this.orderService
      .getOrderBySessionId(this.id.toString())
      .subscribe((data) => {
        this.orderItems = data.OrderItems;
      });
  }

  ngOnInit(): void {}
}
