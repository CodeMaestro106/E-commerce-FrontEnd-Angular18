import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';
import { Category, CategoryResponse } from '../../models/category';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';

import { Location } from '@angular/common';
import { Product } from '../product.type';
import { Observable } from 'rxjs';

import { Injector } from '@angular/core';
import { BaseComponent } from '../../../common/base/BaseComponent';
import { Store } from '@ngrx/store';
import {
  selectCategoryItems,
  selectedCategoryItem,
} from '../../category/category.selector';

import { selectError } from '../product.selector';
import { createProductAction } from '../product.actions';

import { getCategoryListAction } from '../../category/category.actions';

@Component({
  selector: 'app-create-product',
  standalone: false,
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent extends BaseComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imgUrl: '',
    category: '',
    categoryId: 0,
    createdAt: '',
    updatedAt: '',
  };
  errorMessage$!: Observable<string | null>;
  categories$: Observable<Category[]>;
  selectedCategoryId: number | null = null;

  selectedFile: File | null = null; // Store the selected file
  previewUrl: string | null = null; // URL for the image preview

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
    injector: Injector,
    private store: Store,
  ) {
    super(injector);
    this.categories$ = this.store.select(selectCategoryItems);
    this.errorMessage$ = this.store.select(selectError);
  }

  ngOnInit() {
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
          // Assuming selectedCategory has a 'name' property
          this.product.category = selectedCategory.name; // Get category name
        }
      });
  }

  saveProduct(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('name', this.product.name);
      formData.append('description', this.product.description);
      formData.append('price', this.product.price.toString());
      formData.append('stock', this.product.stock.toString());
      formData.append('category', this.product.category);

      formData.append(
        'productImage',
        this.selectedFile,
        this.selectedFile.name,
      );

      this.store.dispatch(createProductAction({ product: formData }));
    } else {
      alert('Please select a product image.');
    }
  }

  onSubmit() {
    this.saveProduct();
  }
}
