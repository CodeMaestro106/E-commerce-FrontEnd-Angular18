import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CartItem } from '../cart.type';

import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartItemComponent {
  // @Input() cartItem: CartItem;
  @Input() cartItem: CartItem = {} as CartItem;
  @Output() increaseItemInCartEvent = new EventEmitter<CartItem>();
  @Output() reduceItemInCartEvent = new EventEmitter<CartItem>();
  @Output() removeItemInCartEvent = new EventEmitter<CartItem>();

  constructor(private location: Location) {}

  increaseItemInCart() {
    this.increaseItemInCartEvent.emit(this.cartItem);
  }

  reduceItemInCart() {
    this.reduceItemInCartEvent.emit(this.cartItem);
  }

  removeItemFromCart() {
    this.removeItemInCartEvent.emit(this.cartItem);
  }
}
