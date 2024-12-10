import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { Product } from '../../../store/product/product.type';
import { selectCheckProductInWishList } from '../../../store/favorite/favorite.selector';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card-component.component.html',
  styleUrl: './product-card-component.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponentComponent implements OnInit {
  @Input() product: Product = {} as Product;
  isWishList$ = new Observable<boolean>();
  @Output() gotoCartEvent = new EventEmitter<Product>();

  @Output() addProductInWishListEvent = new EventEmitter<Product>();
  @Output() removeProductInWishListEvent = new EventEmitter<Product>();

  @Output() gotoProductDetailEvent = new EventEmitter<Product>();

  constructor(
    private location: Location,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.isWishList$ = this.store.select(
      selectCheckProductInWishList(this.product.id),
    );
  }

  gotoCart(): void {
    this.gotoCartEvent.emit(this.product);
  }

  toggleWishList(): void {
    let isChecked: boolean = false;
    const sub = this.isWishList$.subscribe((value) => (isChecked = value));
    sub.unsubscribe();

    if (!isChecked) {
      this.addProductInWishListEvent.emit(this.product);
    } else {
      this.removeProductInWishListEvent.emit(this.product);
    }
  }

  gotoProductDetail(): void {
    this.gotoProductDetailEvent.emit(this.product);
  }

  goBack(): void {
    this.location.back();
  }
}
