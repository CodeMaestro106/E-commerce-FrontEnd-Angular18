import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
  standalone: false,
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  category: Category = new Category();
  id: number = 0;
  errorMessage: string = '';

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.category = new Category();

    this.id = this.route.snapshot.params['id'];

    this.categoryService.getCategoryById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.category = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCategory() {
    this.categoryService.updateCategory(this.id, this.category).subscribe(
      (data) => {
        console.log(data);
        this.category = new Category();
        this.goToCategoryList();
      },
      (error) => {
        console.log(error.error.msg);
        this.errorMessage = error.error.msg;
      }
    );
  }

  onSubmit() {
    this.updateCategory();
  }

  goToCategoryList() {
    this.router.navigate(['admin/categories']).then(() => {
      this.cdr.detectChanges();
    });
  }
}
