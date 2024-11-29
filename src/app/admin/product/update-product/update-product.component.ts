import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';


import { Product } from '../../models/product';
import { Category, CategoryResponse } from '../../models/category';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  product: Product = new Product();
  id: number = 0;

  errorMessage: string = '';
  categories: Category[] = [];
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
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCategoryList();

    this.id = this.route.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe(
      (data) => {
        this.product = this.productService.transformToProduct(data);

        if (this.product.category) {
          this.selectedCategoryId = Number(
            this.categories.find((item) => item.name === this.product.category)
              ?.id
          );
          console.log(this.selectedCategoryId);
        }

        if (this.product.imgUrl) {
          this.previewUrl = this.product.imgUrl;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategoryList(): void {
    this.categoryService
      .getCategoryList()
      .subscribe((data: any) => {
        this.categories = data;
      });
  }

  // get selected category Item
  onCategoryChange(event: any): void {
    this.selectedCategoryId = Number(event.target.value);

    const selectedCategory = this.categories.find(
      (category) => category.id === this.selectedCategoryId
    );

    if (selectedCategory) {
      this.product.category = selectedCategory.name; // Get category name
    }
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
        this.selectedFile.name
      );

      this.productService.updateProduct(this.product.id, formData).subscribe(
        (data) => {
          console.log(data);
          this.goToProductList();
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.error.msg;
        }
      );
    } else {
      alert('Please select a product image.');
    }
  }

  goToProductList() {
    this.router.navigate(['admin/products']);
  }

  onSubmit() {
    console.log(this.product);
    this.saveProduct();
  }

  goBack(): void {
    this.location.back();
  }
}
