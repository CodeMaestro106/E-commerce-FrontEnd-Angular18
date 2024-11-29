import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


import { Product, ProductResponse } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    console.log('product list reload');
    this.productService.getProductList().subscribe((data) => {
      console.log(data);

      this.productsSubject.next(
        data.map((item) => {
          return this.productService.transformToProduct(item);
        })
      ); // Update the BehaviorSubject
    });
  }

  createProduct() {
    this.router.navigate(['admin/create-product']);
  }

  productDetails(id: number) {
    this.router.navigate(['admin/product-details', id]);
  }

  updateProduct(id: number) {
    this.router.navigate(['admin/update-product', id]);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((data) => {
      console.log(data);
      this.getProducts();
    });
  }
}
