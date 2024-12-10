import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/base/BaseComponent';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injector } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../../store/product/product.type';
import {
  getFavoriteListAction,
  deleteFavoriteAction,
} from '../../store/favorite/favorite.actions';
import { selectProductsInFavoriteList } from '../../store/favorite/favorite.selector';

import { ModalService } from '../../common/modal/service/modal.service';
import { addItemInCart } from '../../store/user-cart/cart.actions';

@Component({
  selector: 'favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent extends BaseComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private modalService: ModalService,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsInFavoriteList);
    this.products$.subscribe((products) => {
      if (!products || products.length === 0) {
        console.log('get products');
        this.getProducts();
      }
    });
  }

  private getProducts() {
    this.store.dispatch(getFavoriteListAction());
  }

  deleteProduct(productId: number) {
    const modalData = {
      title: 'Delete Product in your wishlist',
      content: 'Are you sure your want to remove the product in your wishlist?',
      confirmAction: () => {
        this.store.dispatch(deleteFavoriteAction({ productId: productId }));
      },
    };
    this.modalService.openModal(modalData);
  }

  addProductInCart(productId: number): void {
    this.store.dispatch(
      addItemInCart({
        productId: productId,
        quantity: 1,
      }),
    );
  }
}
