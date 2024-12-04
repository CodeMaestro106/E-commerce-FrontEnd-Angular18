import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProductItems } from '../product.selector';
import { deleteProductAction, getProductListAction } from '../product.actions';
import { Product } from '../product.type';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private router: Router,
    private store: Store,
  ) {
    // Fetching categories
    this.products$ = this.store.select(selectProductItems);
  }
  ngOnInit() {
    console.log(this.products$);
    this.products$.subscribe((products) => {
      if (!products || products.length === 0) {
        this.getProducts();
      }
    });
  }

  private getProducts() {
    this.store.dispatch(getProductListAction());
  }

  createProduct() {
    this.router.navigate(['admin/create-product']);
  }

  productDetails(id: number) {
    this.router.navigate(['admin/product-details', id]);
  }

  updateProduct(id: number) {
    this.router.navigate(['admin/update-product', id]);
  }

  deleteProduct(productId: number) {
    this.store.dispatch(deleteProductAction({ id: productId }));
  }
}
