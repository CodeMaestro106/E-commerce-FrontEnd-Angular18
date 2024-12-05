import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { Category } from '../../../store/category/category.type';
import { Store } from '@ngrx/store';
import {
  getCategoryListAction,
  deleteCategoryAction,
} from '../../../store/category/category.actions';
import { selectCategoryItems } from '../../../store/category/category.selector';
import { ModalService } from '../../../common/modal/service/modal.service';

import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private router: Router,
    private store: Store,
    private modalService: ModalService,
  ) {
    // Fetching categories
    this.categories$ = this.store.select(selectCategoryItems);
  }

  ngOnInit() {
    console.log(this.categories$);
    this.categories$.subscribe((categories) => {
      if (!categories || categories.length === 0) {
        this.getCategories();
      }
    });
    this.categories$.subscribe((categories) => {
      this.displayData$.next(categories);
      this.totalItems$.next(categories.length); // Total number of items
      this.updatePaginatedData();
    });
  }

  private getCategories() {
    console.log('category list reload');
    this.store.dispatch(getCategoryListAction());
  }

  createCategory() {
    this.router.navigate(['admin/create-category']);
  }

  categoryDetails(id: number) {
    this.router.navigate(['admin/category-details', id]);
  }

  updateCategory(id: number) {
    this.router.navigate(['admin/update-category', id]);
  }

  // before the delete acion, open the modal.
  deleteCategory(id: number) {
    const modalData = {
      title: 'Delete Category',
      content: 'Are you sure your want to remove the category?',
      confirmAction: () => {
        this.store.dispatch(deleteCategoryAction({ id }));
      },
    };
    this.modalService.openModal(modalData);
  }

  // paginator.

  pageSize$ = new BehaviorSubject<number>(5); // Number of items per page
  currentPage$ = new BehaviorSubject<number>(0); // Current page index
  displayData$ = new BehaviorSubject<Category[]>([]);
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
    this.categories$.subscribe((categories) =>
      this.displayData$.next(categories.slice(start, end)),
    );
  }
}
