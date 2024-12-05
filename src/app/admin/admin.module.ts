import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserListComponent } from './user/user-list/user-list.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';
import { StoreModule } from '@ngrx/store';
import {
  categoryFeatureKey,
  categoryReducer,
} from '../store/category/category.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from '../store/category/category.effects';
import { cartFeatureKey, cartReducer } from '../store/cart/cart.reducer';
import { CartEffects } from '../store/cart/cart.effects';

import { userFeatureKey, userReducer } from '../store/user/user.reducer';
import { UserEffects } from '../store/user/user.effects';
import {
  productFeatureKey,
  productReducer,
} from '../store/product/product.reducer';
import { ProductEffects } from '../store/product/product.effects';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'admin/dashboard', component: DashboardComponent },
      // Category CRUD
      { path: 'admin/categories', component: CategoryListComponent },
      { path: 'admin/create-category', component: CreateCategoryComponent },
      { path: 'admin/update-category/:id', component: UpdateCategoryComponent },
      {
        path: 'admin/category-details/:id',
        component: CategoryDetailsComponent,
      },
      // Product CRUD
      { path: 'admin/products', component: ProductListComponent },
      { path: 'admin/create-product', component: CreateProductComponent },
      { path: 'admin/update-product/:id', component: UpdateProductComponent },
      { path: 'admin/product-details/:id', component: ProductDetailsComponent },

      // cart
      { path: 'admin/cart', component: CartListComponent },
      { path: 'admin/cart-details/:id', component: CartDetailsComponent },

      // user
      { path: 'admin/users', component: UserListComponent },
    ],
  },
];

@NgModule({
  declarations: [
    // Category
    CategoryListComponent,
    CategoryDetailsComponent,
    UpdateCategoryComponent,
    CreateCategoryComponent,
    // Product
    CreateProductComponent,
    UpdateProductComponent,
    ProductDetailsComponent,
    ProductListComponent,
    // cart
    CartListComponent,
    CartDetailsComponent,
    // User
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    StoreModule.forRoot({}),
    RouterModule.forChild(routes),
    FormsModule,
    StoreModule.forFeature(categoryFeatureKey, categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),

    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([CartEffects]),

    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects]),

    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),

    MatPaginatorModule, // Add MatPaginatorModule here
    MatTableModule, // Add MatTableModule if you're using tables
  ],
})
export class AdminModule {}
