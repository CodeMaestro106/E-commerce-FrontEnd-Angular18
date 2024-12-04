import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../../service/category.service';
import { Category, CategoryResponse } from '../../models/category';
import { Store } from '@ngrx/store';
import {
  getCategoryListAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '../category.actions';
import { selectCategoryItems } from '../category.selector';

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

  deleteCategory(categoryId: number) {
    this.store.dispatch(deleteCategoryAction({ id: categoryId }));
  }
}
