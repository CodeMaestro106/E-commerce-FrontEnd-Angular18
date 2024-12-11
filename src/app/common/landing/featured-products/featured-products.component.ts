import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'featured-products',
  standalone: true,
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
