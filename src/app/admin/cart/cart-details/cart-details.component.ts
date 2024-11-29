import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../service/cart.service';

import { Category, CategoryResponse } from '../../models/category';

import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  id: number = 0;
  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.cartService.getCartById(this.id).subscribe((data) => {
      console.log(data);
      this.cartItems = data;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
