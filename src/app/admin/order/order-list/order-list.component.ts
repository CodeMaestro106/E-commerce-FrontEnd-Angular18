import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injector } from '@angular/core';

import { Order } from '../../../store/order/order.type';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../common/base/BaseComponent';

import { selectOrders } from '../../../store/order/order.selector';
import { getOrderListAction } from '../../../store/order/order.actions';
import { take } from 'rxjs';

@Component({
  selector: 'order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent extends BaseComponent implements OnInit {
  orders$!: Observable<Order[]>;

  constructor(
    private router: Router,
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
    // Fetching orders
    this.orders$ = this.store.select(selectOrders);
  }

  ngOnInit() {
    this.orders$.pipe(take(1)).subscribe((orders) => {
      if (!orders || orders.length === 0) {
        this.getOrderInfo();
      }
    });
  }

  private getOrderInfo() {
    this.store.dispatch(getOrderListAction());
  }

  orderDetail(id: string) {
    this.router.navigate(['admin/order-details', id]);
  }
}
