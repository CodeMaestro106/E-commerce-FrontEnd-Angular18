import { Component } from '@angular/core';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';

@Component({
  selector: 'landing',
  standalone: true,
  imports: [FeaturedProductsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
