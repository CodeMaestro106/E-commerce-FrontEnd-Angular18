import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '../../service/category.service';
import { Category, CategoryResponse } from '../../models/category';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    console.log('category list reload');
    this.categoryService
      .getCategoryList()
      .subscribe((data: any) => {
        console.log(data);
        this.categoriesSubject.next(data); // Update the BehaviorSubject
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

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe((data) => {
      console.log(data);
      this.getCategories();
    });
  }
}
