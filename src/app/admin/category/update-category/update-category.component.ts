import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { updateCategoryAction } from '../category.actions';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { selectError, selectedCategoryItem } from '../category.selector';

@Component({
  selector: 'app-update-category',
  standalone: false,
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent extends BaseComponent implements OnInit {
  category: Category = new Category();
  id: number = 0;
  name: string = '';
  errorMessage$!: Observable<string | null>;

  constructor(
    injector: Injector,
    private store: Store,
    private route: ActivatedRoute,
  ) {
    super(injector);
    this.id = this.route.snapshot.params['id'];
    this.errorMessage$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.category = new Category();
    this.store.select(selectedCategoryItem(this.id)).subscribe((category) => {
      if (category) {
        this.name = category.name;
      }
    });
  }

  updateCategory() {
    this.store.dispatch(updateCategoryAction({ id: this.id, name: this.name }));
  }

  onSubmit() {
    this.updateCategory();
  }
}
