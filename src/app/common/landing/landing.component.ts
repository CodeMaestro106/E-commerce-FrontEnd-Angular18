import { Component } from '@angular/core';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { style } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'landing',
  standalone: true,
  imports: [FeaturedProductsComponent, CarouselComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  public slides = [
    {
      src: 'assest/images/categories/product-big-1.jpg',
      title: 'Work light, LED, white',
      style: 'Styles Accessories & New Table Lamp',
    },
    {
      src: 'assest/images/categories/product-big-2.jpg',
      title: 'Radiant, Stylish Table Lamps',
      style: 'Explore Radiant Illumination for Your Space',
    },
    {
      src: 'assest/images/categories/product-big-3.jpg',
      title: 'Sleek, Contemporary Glow',
      style: 'Experience Modern Elegance in Innovative Lighting Designs',
    },
  ];
}
