import { Component, OnInit } from '@angular/core';
import { Product } from '../../../store/product/product.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../store/product/product.service';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import * as CartAtions from '../../../store/user-cart/cart.actions';
import * as FavoriteActions from '../../../store/favorite/favorite.actions';

import { Observable } from 'rxjs';
import { selectedProductItem } from '../../../store/product/product.selector';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id: number = 0;

  product$: Observable<Product | undefined> = new Observable<
    Product | undefined
  >();

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.product$ = this.store.select(selectedProductItem(this.id));
    this.product$.subscribe((product) => {
      if (product) {
        this.mainImage = { id: '0', src: product.imgUrl };
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
        console.log('product emitted:', product);
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/products']);
  }
  open3dViewModal(): void {
    this.show3dViewModal$.next(true);
  }

  close3dViewModal(): void {
    this.show3dViewModal$.next(false);
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

  addToWishList() {
    console.log('add favorite click');
    this.store.dispatch(
      FavoriteActions.addFavoriteAction({ productId: this.id }),
    );
  }
}
