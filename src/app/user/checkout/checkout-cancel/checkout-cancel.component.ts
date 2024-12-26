import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'checkout-cancel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-cancel.component.html',
  styleUrl: './checkout-cancel.component.scss',
})
export class CheckoutCancelComponent {}
