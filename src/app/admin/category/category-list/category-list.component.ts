import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CategoryService } from '../../service/category.service';
import { Category, CategoryResponse } from '../../models/category';
import { Store } from '@ngrx/store';
import {
  getCategoryListAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '../category.actions';
import { selectCategoryItems } from '../category.selector';
import { DeleteModalComponent } from '../../../common/modal/delete/delete-modal.component';
import { ModalService } from '../../../common/modal/service/modal.service';
import { Title } from '@angular/platform-browser';

import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { slice } from 'lodash';
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
  }

  private getCategories() {
    console.log('category list reload');
    this.store.dispatch(getCategoryListAction());
    this.categories$.subscribe((categories) => {
      this.displayData = categories;
      this.totalItems = categories.length; // Total number of items
      this.updatePaginatedData();
    });
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

  pageSize = 5; // Number of items per page
  currentPage = 0; // Current page index
  displayData: Category[] = [];
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
    this.categories$.subscribe(
      (categories) => (this.displayData = categories.slice(start, end)),
    );
  }
}
