import { Component, Injector, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Cart } from '../../../store/cart/cart.type';
import { Store } from '@ngrx/store';
import { getCartListAction } from '../../../store/cart/cart.actions';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { selectCarts } from '../../../store/cart/cart.selector';
import { take } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  standalone: false,
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent extends BaseComponent implements OnInit {
  carts$!: Observable<Cart[]>;

  constructor(
    private router: Router,
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
    // Fetching carts
    this.carts$ = this.store.select(selectCarts);
  }

  ngOnInit() {
    this.carts$.pipe(take(1)).subscribe((carts) => {
      if (!carts || carts.length === 0) {
        this.getCartInfo();
      }
    });
  }

  private getCartInfo() {
    this.store.dispatch(getCartListAction());
  }

  cartDetails(id: number) {
    this.router.navigate(['admin/cart-details', id]);
  }
}
