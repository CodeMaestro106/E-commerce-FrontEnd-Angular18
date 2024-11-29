import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-details',
  standalone: false,
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  id: number = 0;
  category: Category = new Category();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.category = new Category();
    this.categoryService.getCategoryById(this.id).subscribe((data) => {
      this.category = data;
    });
  }
}

