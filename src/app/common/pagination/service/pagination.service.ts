// pagination.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { setPage, setPageSize, setData } from './pagination.actions';
import {
  selectPaginatedData,
  selectCurrentPage,
  selectPageSize,
  selectTotalItems,
} from './pagination.selectors';
import {Product } from '../../../admin/product/product.type';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private currentPageSubject: BehaviorSubject<number>;
  private pageSizeSubject: BehaviorSubject<number>;

  constructor(private store: Store) {
    this.currentPageSubject = new BehaviorSubject<number>(1); // Default page is 1
    this.pageSizeSubject = new BehaviorSubject<number>(10); // Default page size is 10
  }

  // Set the data (could be done once at the beginning of the app)
  setData(data: Product[]): void {
    this.store.dispatch(setData({ data }));
  }

  // Get current page
  getCurrentPage(): Observable<number> {
    return this.store.select(selectCurrentPage);
  }

  // Get page size
  getPageSize(): Observable<number> {
    return this.store.select(selectPageSize);
  }

  // Get total items count
  getTotalItems(): Observable<number> {
    return this.store.select(selectTotalItems);
  }

  // Get paginated data
  getPaginatedData(): Observable<Product[]> {
    return this.store.select(selectPaginatedData);
  }

  // Set current page
  setPage(page: number): void {
    this.store.dispatch(setPage({ page }));
  }

  // Set page size
  setPageSize(pageSize: number): void {
    this.store.dispatch(setPageSize({ pageSize }));
  }
}
