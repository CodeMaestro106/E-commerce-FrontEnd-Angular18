import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CartMainComponent } from './cart/cart-main/cart-main.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { StoreModule } from '@ngrx/store';
import { cartFeatureKey, cartReducer } from './cart/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffect } from './cart/cart.effects';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailComponent } from './product/product-detail-component/product-detail.component';
import {
  categoryFeatureKey,
  categoryReducer,
} from './category/category.reducer';
import { CategoryEffects } from './category/category.effects';
import { productFeatureKey, productReducer } from './product/product.reducer';
import { ProductEffects } from './product/product.effects';
import { ProductCardComponentComponent } from './product/product-card-component/product-card-component.component';

import { ProfileComponent } from './profile/profile.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Product3dViewComponent } from './product/product-3d-view/product-3d-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { ModelViewerComponent } from './product/model-viewer/model-viewer.component';

const routes: Routes = [
  { path: 'cart', component: CartMainComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'model-view', component: ModelViewerComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    CartMainComponent,
    ProductDetailComponent,
    ProfileComponent,
    ModelViewerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([CartEffect]),
    StoreModule.forFeature(categoryFeatureKey, categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
    RouterModule.forChild(routes),
    CartItemComponent,
    ProductCardComponentComponent,
    FormsModule,
    Product3dViewComponent,
  ],
})
export class UserModule {}
