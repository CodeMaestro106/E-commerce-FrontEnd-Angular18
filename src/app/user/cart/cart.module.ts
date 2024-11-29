import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartMainComponent } from './cart-main/cart-main.component';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { cartFeatureKey, cartReducer } from './cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffect } from './cart.effects';
import { RouterModule } from '@angular/router';

// const routes: Routes = [
//   { path: 'cart', component: CartComponent },
//   // Other routes for your app
// ];

// @NgModule({
//   declarations: [CartComponent],
//   imports: [
//     CommonModule,
//     StoreModule.forFeature(cartFeatureKey, cartReducer),
//     EffectsModule.forFeature([CartEffect]),
//     RouterModule.forChild(routes),
//   ],
// })
// export class CartModule {}
