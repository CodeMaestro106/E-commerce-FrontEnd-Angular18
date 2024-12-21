import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectError,
  selectedProductItem,
} from '../../../store/product/product.selector';

import { Injector } from '@angular/core';
import { Product } from '../../../store/product/product.type';
import { Category } from '../../../store/category/category.type';
import { getCategoryListAction } from '../../../store/category/category.actions';

import { map } from 'rxjs';

import {
  selectCategoryItems,
  selectedCategoryItem,
} from '../../../store/category/category.selector';
import { updateProductAction } from '../../../store/product/product.actions';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent extends BaseComponent implements OnInit {
  id: number = 0;
  product$: Observable<Product | undefined> = new Observable<
    Product | undefined
  >();
  errorMessage$!: Observable<string | null>;
  categories$: Observable<Category[]> = new Observable<Category[]>();
  selectedCategoryId: number | null = null;

  selectedFile: File | null = null; // Store the selected file
  previewUrl: string | null = null; // URL for the image preview

  tempProduct: Product = {
    id: 0,
    stripe_product_id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    priceId: '',
    imgUrl: '',
    category: '',
    categoryId: 0,
    createdAt: '',
    updatedAt: '',
  };
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Check if the selected file is an image
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;

        // Generate a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file.');
        input.value = ''; // Clear the input
        this.previewUrl = null;
      }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.categories$ = this.store.select(selectCategoryItems);
    this.errorMessage$ = this.store.select(selectError);
    this.id = this.route.snapshot.params['id'];
    this.product$ = this.store.select(selectedProductItem(this.id));

    this.product$.subscribe((product) => {
      if (product) {
        this.tempProduct = { ...product };
      }
    });

    this.categories$.subscribe((categories) => {
      if (!categories || categories.length === 0) {
        this.getCategories();
      }
    });
  }
  private getCategories() {
    console.log('category list reload');
    this.store.dispatch(getCategoryListAction());
  }

  // get selected category Item
  onCategoryChange(event: any): void {
    this.selectedCategoryId = Number(event.target.value);

    this.store
      .select(selectedCategoryItem(this.selectedCategoryId))
      .subscribe((selectedCategory) => {
        if (selectedCategory) {
          // Update the category of the product by merging the selectedCategory

          return {
            ...this.tempProduct,
            category: selectedCategory.name,
            categoryId: selectedCategory.id,
          };
        }
        return this.product$; // If no selectedCategory, return product$ as is
      });
  }

  saveProduct(): void {
    if (this.selectedFile) {
      if (this.tempProduct) {
        const formData: FormData = new FormData();

        formData.append(
          'productImage',
          this.selectedFile!,
          this.selectedFile!.name,
        );
        formData.append('name', this.tempProduct.name);
        formData.append('description', this.tempProduct.description);
        formData.append('price', this.tempProduct.price.toString());
        formData.append('priceId', this.tempProduct.priceId);

        formData.append('stock', this.tempProduct.stock.toString());
        formData.append('category', this.tempProduct.category);
        formData.append('categoryId', this.tempProduct.categoryId.toString());

        this.store.dispatch(
          updateProductAction({ id: this.id, product: formData }),
        );
      }
    } else {
      alert('Please select a product image.');
    }
  }

  onSubmit() {
    this.saveProduct();
  }
}
