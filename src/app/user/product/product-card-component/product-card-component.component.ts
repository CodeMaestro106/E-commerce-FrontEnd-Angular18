import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../product.type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card-component.component.html',
  styleUrl: './product-card-component.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponentComponent {
  @Input() product: Product = {} as Product;
  @Output() gotoCartEvent = new EventEmitter<Product>();
  @Output() addProductInWishListEvent = new EventEmitter<Product>();
  @Output() gotoProductDetailEvent = new EventEmitter<Product>();

  constructor(private location: Location) {}

  gotoCart(): void {
    this.gotoCartEvent.emit(this.product);
  }

  addProductInWishList(): void {
    this.addProductInWishListEvent.emit(this.product);
  }

  gotoProductDetail(): void {
    this.gotoProductDetailEvent.emit(this.product);
  }

  goBack(): void {
    this.location.back();
  }
}
