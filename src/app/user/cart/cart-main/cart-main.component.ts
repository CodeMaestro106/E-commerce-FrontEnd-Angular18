import {
  Component,
  EventEmitter,
  Input,
  Output,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';

import {
  selectCartState,
  selectCartItems,
  selectLoading,
  selectError,
  selectCartTotalPrice,
} from '../cart.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../cart.type';
import * as CartActions from '../cart.actions';
import { CartItemComponent } from '../cart-item/cart-item.component';

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
    this.store.dispatch(CartActions.getItemsInCart());
    // console.log('history => ', history.state);
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
