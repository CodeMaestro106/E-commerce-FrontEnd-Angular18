import { Component, ChangeDetectorRef } from '@angular/core';
import { Category } from '../category/category.type';
import * as CategoryActions from '../category/category.actions';

import * as ProductActions from '../product/product.actions';
import { Product } from '../product/product.type';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { selectCategoryItems } from '../category/category.selector';
import { selectProductItems } from '../product/product.selector';
import { Router } from '@angular/router';
import { map, tap, distinctUntilChanged } from 'rxjs';
import { AuthStorageService } from '../../auth/auth.storage.service';

import * as CartAtions from '../cart/cart.actions';

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
  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;

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
  ) {
    // Fetching categories and products
    this.categories$ = this.store.select(selectCategoryItems);

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

          console.log(filteredProducts);

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
          // Filter by category
          const matchedCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.categoryId);

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
    // Dispatch actions to load category and product list
    this.store.dispatch(CategoryActions.getCategoryListAction());
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

  addProductInWishList(item: Product): void {}

  gotoProductDetail(item: Product): void {
    this.router.navigate(['product', item.id]);
  }
}
