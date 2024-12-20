import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../store/product/product.type';
import { Observable } from 'rxjs';

import { Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { selectedProductItem } from '../../../store/product/product.selector';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent extends BaseComponent implements OnInit {
  id: number = 0;
  product$: Observable<Product | undefined> = new Observable<
    Product | undefined
  >();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.product$ = this.store.select(selectedProductItem(this.id));
    this.product$.subscribe((product) => {
      console.log('product emitted:', product);
    });

    console.log(this.product$);
  }
}
