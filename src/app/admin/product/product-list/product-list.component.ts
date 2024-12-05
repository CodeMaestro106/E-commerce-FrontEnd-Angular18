import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProductItems } from '../product.selector';
import { deleteProductAction, getProductListAction } from '../product.actions';
import { Product } from '../product.type';
import { Category } from '../../models/category';
import { selectCategoryItems } from '../../category/category.selector';
import { tap, map } from 'rxjs';
import { getCategoryListAction } from '../../category/category.actions';

import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  isDropdownOpen = false;

  // filter conditions
  public selectedCategories$ = new BehaviorSubject<number[]>([]);
  private searchKey$ = new BehaviorSubject<string>('');
  localSearchKey: string = '';

  constructor(
    private router: Router,
    private store: Store,
  ) {
    // Fetching categories
    this.categories$ = this.store.select(selectCategoryItems);
    this.products$ = this.store.select(selectProductItems);

    this.products$ = combineLatest([
      this.store.select(selectProductItems),
      this.selectedCategories$,
      this.searchKey$,
    ]).pipe(
      tap(() => console.log('change product rule')),
      map(([products, selectedCategoriese, searchKey]) => {
        return products.filter((product) => {
          const categoryMatch =
            selectedCategoriese.length === 0 ||
            selectedCategoriese.includes(product.categoryId);
          // check if the product name matches the search key
          const searchMatch = searchKey
            ? product.name.toLowerCase().includes(searchKey.toLowerCase())
            : true;
          return categoryMatch && searchMatch;
        });
      }),
    );
  }
  ngOnInit() {
    console.log(this.products$);
    this.products$.subscribe((products) => {
      if (!products || products.length === 0) {
        this.getProducts();
      }
    });
    this.categories$.subscribe((categories) => {
      if (!categories || categories.length === 0) {
        this.getCategories();
      }
    });
  }

  // Toggle the dropdown open/close
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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

  onChangeSearchKey() {
    console.log('Search Key:', this.localSearchKey);
    this.searchKey$.next(this.localSearchKey);
  }

  private getCategories() {
    console.log('category list reload');
    this.store.dispatch(getCategoryListAction());
  }

  private getProducts() {
    this.store.dispatch(getProductListAction());
    this.products$.subscribe((products) => {
      this.displayData = products;
      this.totalItems = products.length; // Total number of items
      this.updatePaginatedData();
    });
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

  // paginator.

  pageSize = 5; // Number of items per page
  currentPage = 0; // Current page index
  displayData: Product[] = [];
  totalItems: number = 0; // To hold total number of items for pagination
  pageSizeOptions: number[] = [5, 10, 20]; // Pagination options (items per page)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.updatePaginatedData();
  }

  // Called when the page is changed
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.products$.subscribe(
      (products) => (this.displayData = products.slice(start, end)),
    );
  }
}
