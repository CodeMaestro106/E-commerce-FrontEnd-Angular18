import { Component, ChangeDetectorRef } from '@angular/core';
import { Category } from '../../store/category/category.type';
import * as CategoryActions from '../../store/category/category.actions';

import * as ProductActions from '../../store/product/product.actions';
import { Product } from '../../store/product/product.type';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

import { selectCategoryItems } from '../../store/category/category.selector';
import { selectProductItems } from '../../store/product/product.selector';
import { selectProductsInFavoriteList } from '../../store/favorite/favorite.selector';

import { Router } from '@angular/router';
import { map, tap, distinctUntilChanged } from 'rxjs';
import { AuthStorageService } from '../../auth/auth.storage.service';

import * as CartAtions from '../../store/user-cart//cart.actions';
import * as FavoriteActions from '../../store/favorite/favorite.actions';
import { ToastrService } from 'ngx-toastr';

import { take } from 'rxjs';

export enum OrderItem {
  NEWEST = 'Newest',
  PRICE_ASC = 'High to Low',
  PRICE_DSC = 'Low to High',
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  products$: Observable<Product[]> = new Observable<Product[]>();
  categories$: Observable<Category[]> = new Observable<Category[]>();

  favorites$: Observable<Product[]> = new Observable<Product[]>();

  // filter conditions
  private selectedCategories$ = new BehaviorSubject<number[]>([]);
  public priceFilter$ = new BehaviorSubject<number>(0); // This will hold the price filter value
  maxPrice: number = 0;

  // Enum values are used in the component
  OrderItem = OrderItem; // Expose the enum to the template
  public orderItem$ = new BehaviorSubject<string>(OrderItem.NEWEST);

  constructor(
    private store: Store,
    private router: Router,
    private storageService: AuthStorageService,
    private cdRef: ChangeDetectorRef,
    private toastService: ToastrService,
  ) {}

  // Handle category toggle (select or deselect categories)
  toggleCategory(categoryId: number, isChecked: boolean): void {
    const selectedIds = this.selectedCategories$.value;
    if (isChecked) {
      // Add category to selected categories
      this.selectedCategories$.next([...selectedIds, categoryId]);
    } else {
      // Remove category from selected categories
      this.selectedCategories$.next(
        selectedIds.filter((id) => id !== categoryId),
      );
    }
  }

  changeSortOrder(orderItem: string): void {
    this.orderItem$.next(orderItem);
  }

  // Handle price filter slider change
  onPriceChange(newPrice: string): void {
    this.priceFilter$.next(parseInt(newPrice, 10)); // Update the price filter
  }

  ngOnInit(): void {
    // Fetching categories
    this.categories$ = this.store.select(selectCategoryItems);
    this.products$ = this.store.select(selectProductItems);

    this.products$.pipe(take(1)).subscribe((products) => {
      if (!products || products.length === 0) {
        this.getProducts();
      }
    });
    this.categories$.pipe(take(1)).subscribe((categories) => {
      if (!categories || categories.length === 0) {
        this.getCategories();
      }
    });

    // Combining products, selected categories, and price filter
    this.products$ = combineLatest([
      this.store.select(selectProductItems),
      this.selectedCategories$,
      this.priceFilter$,
      this.orderItem$,
    ]).pipe(
      tap(([products, selectedCategories]) => {
        // Set maxPrice only once when products are available

        if (products.length > 0) {
          // Filter the products based on selected categories
          const filteredProducts = products.filter(
            (product) =>
              selectedCategories.length === 0 ||
              selectedCategories.includes(product.categoryId),
          );

          if (filteredProducts.length > 0) {
            const newMaxPrice = Math.max(
              ...filteredProducts.map((product) => product.price),
              0,
            );

            // Only update maxPrice if it has changed
            if (this.maxPrice !== newMaxPrice) {
              this.maxPrice = newMaxPrice;
              this.priceFilter$.next(this.maxPrice); // Trigger price filter update
            }

            this.cdRef.detectChanges(); // Manually trigger change detection
          }
        }
      }),
      map(([products, selectedCategories, maxPrice, orderItem]) => {
        let filterPrice = maxPrice;
        if (products.length > 0 && maxPrice === 0) {
          filterPrice = this.maxPrice;
        }

        let filterdProducts = products.filter((product) => {
          const categoryId = product.categoryId;

          // Filter by category
          const matchedCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(parseInt(categoryId.toString()));

          console.log(matchedCategory, selectedCategories, product);

          // Filter by price
          const matchedPrice = product.price <= filterPrice;

          return matchedCategory && matchedPrice; // Return the filtered result
        });

        if (orderItem === OrderItem.NEWEST) {
          filterdProducts = filterdProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        } else if (orderItem === OrderItem.PRICE_ASC) {
          filterdProducts = filterdProducts.sort((a, b) => a.price - b.price);
        } else if (orderItem === OrderItem.PRICE_DSC) {
          filterdProducts = filterdProducts.sort((a, b) => b.price - a.price);
        }

        return filterdProducts;
      }),
    );
  }

  private getCategories() {
    this.store.dispatch(CategoryActions.getCategoryListAction());
  }

  private getProducts() {
    this.store.dispatch(ProductActions.getProductListAction());
  }

  gotoCart(item: Product): void {
    if (this.storageService.getUser()) {
      this.store.dispatch(
        CartAtions.addItemInCart({
          productId: item.id,
          quantity: 1,
        }),
      );
    } else {
      this.router.navigate(['login']);
    }
  }

  addProductInWishList(item: Product): void {
    this.store.dispatch(
      FavoriteActions.addFavoriteAction({ productId: item.id }),
    );
  }

  removeProductInWishList(item: Product): void {
    this.store.dispatch(
      FavoriteActions.deleteFavoriteAction({ productId: item.id }),
    );
  }

  gotoProductDetail(item: Product): void {
    this.router.navigate(['product', item.id]);
  }
}
