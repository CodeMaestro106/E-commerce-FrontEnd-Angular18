import { Component } from '@angular/core';

import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../../store/user-cart/cart.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../../store/user-cart/cart.type';
import * as CartActions from '../../../store/user-cart/cart.actions';

import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css'],
})
export class CartMainComponent {
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  constructor(
    private store: Store,
    private location: Location,
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.totalPrice$ = this.store.select(selectCartTotalPrice);
    console.log('history => ', window.history.length);
  }

  ngOnInit() {
    console.log('cart history => ', history.state);
    this.store.dispatch(CartActions.getItemsInCart());
  }

  reduceItem(cartItem: CartItem) {
    this.store.dispatch(CartActions.reduceNumItemInCart({ cartItem }));
  }

  removeItem(cartItem: CartItem) {
    console.log(cartItem);
    this.store.dispatch(CartActions.removeItemInCart({ cartItem }));
  }

  increaseItem(cartItem: CartItem) {
    this.store.dispatch(CartActions.increaseNumItemInCart({ cartItem }));
  }

  goBack() {
    this.location.back();
  }
}
