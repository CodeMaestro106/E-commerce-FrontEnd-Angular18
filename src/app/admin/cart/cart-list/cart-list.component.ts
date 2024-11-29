import { Component, OnInit } from '@angular/core';
import { Category, CategoryResponse } from '../../models/category';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { CartService } from '../../service/cart.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: false,
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCartInfos();
  }

  private getCartInfos() {
    console.log('cart list reload');
    this.cartService.getAllCartInfo().subscribe((data: any) => {
      console.log(data);
      this.cartItems = data;
    });
  }

  cartDetails(id: number) {
    this.router.navigate(['admin/cart-details', id]);
  }

  goBack(): void {
    this.location.back();
  }
}
