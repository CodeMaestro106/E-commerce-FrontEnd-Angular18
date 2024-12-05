import { Component, Injector, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../store/category/category.type';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectedCategoryItem } from '../../../store/category/category.selector';
import { BaseComponent } from '../../../common/base/BaseComponent';

@Component({
  selector: 'app-category-details',
  standalone: false,
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent extends BaseComponent implements OnInit {
  id: number = 0;
  category$!: Observable<Category | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
    this.id = this.route.snapshot.params['id'];
    this.category$ = this.store.select(selectedCategoryItem(this.id));
    this.category$.subscribe((category) => {
      console.log('category emitted:', category);
    });
    console.log(this.category$);
  }

  ngOnInit(): void {}
}
