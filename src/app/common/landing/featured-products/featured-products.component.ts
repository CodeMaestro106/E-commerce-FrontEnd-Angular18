import { Component, OnInit } from '@angular/core';

import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'featured-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
