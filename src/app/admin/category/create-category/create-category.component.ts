import { Component, Injector, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectError } from '../category.selector';
import { createCategoryAction } from '../category.actions';

@Component({
  selector: 'app-create-category',
  standalone: false,
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent extends BaseComponent implements OnInit {
  category: Category = new Category();
  name: string = '';
  errorMessage$!: Observable<string | null>;

  constructor(
    injector: Injector,
    private store: Store,
  ) {
    super(injector);
    this.errorMessage$ = this.store.select(selectError);
  }

  ngOnInit() {}

  saveCategory() {
    this.category = { ...this.category, name: this.name };
    this.store.dispatch(createCategoryAction({ category: this.category }));
  }

  onSubmit() {
    console.log(this.category);
    this.saveCategory();
  }
}
