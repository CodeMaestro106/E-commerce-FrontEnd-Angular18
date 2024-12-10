import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  selectAuthState,
  selectCheckAuthenticate,
  selectUser,
} from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import { AuthStorageService } from '../../auth/auth.storage.service';
import { AuthService } from '../../store/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Product } from '../../store/product/product.type';
import { selectProductsInFavoriteList } from '../../store/favorite/favorite.selector';

import { getFavoriteListAction } from '../../store/favorite/favorite.actions';
import { CartItem } from '../../store/user-cart/cart.type';

import { selectCartItems } from '../../store/user-cart/cart.selectors';
import { getItemsInCart } from '../../store/user-cart/cart.actions';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private roles: string[] = ['ADMIN', 'USER'];
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  username?: string;
  role?: string;

  favoriteProducts$: Observable<Product[]> = new Observable<Product[]>();
  cartItems$: Observable<CartItem[]> = new Observable<CartItem[]>();

  constructor(
    private store: Store,
    private authStorageService: AuthStorageService,
  ) {
    console.log('header contructure');
  }

  ngOnInit(): void {
    const user = this.authStorageService.getUser();
    this.favoriteProducts$ = this.store.select(selectProductsInFavoriteList);

    this.cartItems$ = this.store.select(selectCartItems);

    console.log('header user', user);
    if (user) {
      const decodedToken: any = jwtDecode(user.token);
      this.role = decodedToken.role || null;

      if (this.role == 'USER') {
        console.log('import favorite product in header');
        this.favoriteProducts$.subscribe((products) => {
          if (!products || products.length === 0) {
            console.log('get products from favorite list');
            this.getProducts();
          }
        });
        this.cartItems$.subscribe((cartItems) => {
          if (!cartItems || cartItems.length === 0) {
            this.getCartItemsInfo();
          }
        });
      }

      this.username = user.username;
      this.isLoggedIn$.next(true);
    }
  }

  getCartItemsInfo() {
    this.store.dispatch(getItemsInCart());
  }

  private getProducts() {
    this.store.dispatch(getFavoriteListAction());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.isLoggedIn$.next(false);
  }
}
