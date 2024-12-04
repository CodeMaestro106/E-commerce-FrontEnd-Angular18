import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../service/cart.service';

import { Category, CategoryResponse } from '../../models/category';

import { Location } from '@angular/common';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../cart.type';
import { Store } from '@ngrx/store';
import { selectCartItem } from '../cart.selector';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent extends BaseComponent implements OnInit {
  id: number = 0;
  cartItems$!: Observable<CartItem[] | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
    this.id = this.route.snapshot.params['id'];

    this.cartItems$ = this.store.select(selectCartItem(this.id));
  }

  ngOnInit(): void {}
}
