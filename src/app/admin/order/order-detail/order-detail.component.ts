import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { OrderItem } from '../../../store/order/order.type';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injector } from '@angular/core';

import { BaseComponent } from '../../../common/base/BaseComponent';

import { selectOrderItem } from '../../../store/order/order.selector';

@Component({
  selector: 'order-detail',
  standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent extends BaseComponent implements OnInit {
  id: number = 0;
  orderItems$!: Observable<OrderItem[] | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
    this.id = this.route.snapshot.params['id'];

    this.orderItems$ = this.store.select(selectOrderItem(this.id));
  }

  ngOnInit(): void {}
}
