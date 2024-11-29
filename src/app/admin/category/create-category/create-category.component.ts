import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  standalone: false,
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  category: Category = new Category();
  errorMessage: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {}

  saveCategory() {
    this.categoryService.createCategory(this.category).subscribe(
      (data) => {
        console.log(data);
        this.goToCategoryList();
      },
      (error) => {
        console.log(error.error.msg);
        this.errorMessage = error.error.msg;
      }
    );
  }

  goToCategoryList() {
    this.router.navigate(['admin/categories']);
  }

  onSubmit() {
    console.log(this.category);
    this.saveCategory();
  }
}
