import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProductItems } from '../../../store/product/product.selector';
import {
  deleteProductAction,
  getProductListAction,
} from '../../../store/product/product.actions';
import { Product } from '../../../store/product/product.type';
import { selectCategoryItems } from '../../../store/category/category.selector';
import { tap, map } from 'rxjs';
import { getCategoryListAction } from '../../../store/category/category.actions';

import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Category } from '../../../store/category/category.type';
import { ModalService } from '../../../common/modal/service/modal.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();
  categories$: Observable<Category[]> = new Observable<Category[]>();
  isDropdownOpen = false;

  // filter conditions
  public selectedCategories$ = new BehaviorSubject<number[]>([]);
  private searchKey$ = new BehaviorSubject<string>('');
  localSearchKey: string = '';

  constructor(
    private router: Router,
    private store: Store,
    private modalService: ModalService,
  ) {}
  ngOnInit() {
    // Fetching categories
    this.categories$ = this.store.select(selectCategoryItems);
    this.products$ = this.store.select(selectProductItems);
    this.products$.subscribe((products) => {
      this.displayData$.next(products);
      this.totalItems$.next(products.length); // Total number of items
      this.updatePaginatedData();
    });

    this.products$.pipe(take(1)).subscribe((products) => {
      if (!products || products.length === 0) {
        console.log('get products');
        this.getProducts();
      }
    });
    this.categories$.pipe(take(1)).subscribe((categories) => {
      if (!categories || categories.length === 0) {
        this.getCategories();
      }
    });

    combineLatest([this.products$, this.selectedCategories$, this.searchKey$])
      .pipe(
        map(([products, selectedCategoriese, searchKey]) => {
          console.log('selectedCategories => ', selectedCategoriese);
          const filteredProducts = products.filter((product) => {
            const categoryMatch =
              selectedCategoriese.length === 0 ||
              selectedCategoriese.includes(
                parseInt(product.categoryId.toString()),
              );
            // check if the product name matches the search key
            const searchMatch = searchKey
              ? product.name.toLowerCase().includes(searchKey.toLowerCase())
              : true;
            return categoryMatch && searchMatch;
          });

          return filteredProducts;
        }),
      )
      .subscribe((filteredProducts) => {
        console.log('subscribe filteredProducts => ', filteredProducts);
        this.filteredProducts$.next(filteredProducts);

        this.totalItems$.next(filteredProducts.length);
        this.currentPage$.next(0); // Total number of items
        this.updatePaginatedData();
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

  isCategoryChecked(categoryId: number) {
    return this.selectedCategories$.value.includes(categoryId);
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
    const modalData = {
      title: 'Delete Product',
      content: 'Are you sure your want to remove the product?',
      confirmAction: () => {
        this.store.dispatch(deleteProductAction({ id: productId }));
      },
    };
    this.modalService.openModal(modalData);
  }

  // paginator.

  pageSize$ = new BehaviorSubject<number>(5); // Number of items per page
  currentPage$ = new BehaviorSubject<number>(0); // Current page index
  displayData$ = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = new BehaviorSubject<Product[]>([]);
  totalItems$ = new BehaviorSubject<number>(5); // To hold total number of items for pagination
  pageSizeOptions$ = new BehaviorSubject<number[]>([5, 10, 20]); // Pagination options (items per page)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.updatePaginatedData();
  }

  // Called when the page is changed
  pageChanged(event: PageEvent) {
    this.currentPage$.next(event.pageIndex);
    this.pageSize$.next(event.pageSize);
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const start = this.currentPage$.value * this.pageSize$.value;
    const end = start + this.pageSize$.value;
    this.filteredProducts$.subscribe((products) =>
      this.displayData$.next(products.slice(start, end)),
    );
  }
}
