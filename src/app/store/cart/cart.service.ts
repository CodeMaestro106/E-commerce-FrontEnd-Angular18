import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart, CartItem } from './cart.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.baseUrl}cart`;

  transformToCart(data: any): Cart {
    return {
      id: data.id,
      username: data.User?.username || '',
      cartItems: [...data.CartItems],
      status: data.status,
      totalAmount: 0,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  // Get all cart info for admin
  getAllCartInfo(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/all`);
  }

  constructor(private http: HttpClient) {}
}
