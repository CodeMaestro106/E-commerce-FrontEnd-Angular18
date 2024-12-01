import { Component, OnInit } from '@angular/core';
import { Product } from '../product.type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import * as CartAtions from '../../cart/cart.actions';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id: number = 0;
  product: Product = {
    id: 0,
    name: '',
    description: '',
    stock: 0,
    price: 0,
    imgUrl: '',
    category: '',
    categoryId: 0,
    createdAt: '',
    updatedAt: '',
  };

  mainImage: { id: string; src: string } = {
    id: '',
    src: '',
  };
  Images: { id: string; src: string }[] = [];

  public show3dViewModal$ = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = this.productService.transformToProduct(data);
      this.mainImage = { id: '0', src: this.product.imgUrl };
      console.log(this.mainImage);
      this.Images = [
        {
          id: '1',
          src: 'http://localhost:5000/uploads/image/products/1732626789392-Screenshot_5.jpg',
        },
        {
          id: '2',
          src: 'http://localhost:5000/uploads/image/products/1732626719872-Screenshot_4.jpg',
        },
        {
          id: '3',
          src: 'http://localhost:5000/uploads/image/products/1732626413121-Screenshot_1.jpg',
        },
        {
          id: '4',
          src: 'http://localhost:5000/uploads/image/products/1732626676682-Screenshot_3.jpg',
        },
        {
          id: '5',
          src: 'http://localhost:5000/uploads/image/products/1732626561158-Screenshot_2.jpg',
        },
      ];
    });
  }
  goBack(): void {
    this.location.back();
  }
  open3dViewModal(): void {
    // this.show3dViewModal$.next(true);
  }

  close3dViewModal(): void {
    //   this.show3dViewModal$.next(false);
  }

  gotoCart(productId: number, quantity: string): void {
    this.store.dispatch(
      CartAtions.addItemInCart({
        productId: productId,
        quantity: parseInt(quantity),
      }),
    );
  }

  changeImage(id: string, src: string): void {
    this.mainImage.id = id;
    this.mainImage.src = src;
  }
}
