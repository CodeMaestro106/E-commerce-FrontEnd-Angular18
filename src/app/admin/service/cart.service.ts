import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.baseUrl}cart`;

  constructor(private http: HttpClient) {}

  // Add product to cart
  addProductToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity });
  }

  // Get cart items
  getCart(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Update product info in cart
  updateProductInCart(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, { quantity });
  }

  // Delete product from cart
  deleteProductFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  // Delete all items from cart
  deleteCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  // Get all cart info for admin
  getAllCartInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getCartById(cartId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cartId}`);
  }
}
