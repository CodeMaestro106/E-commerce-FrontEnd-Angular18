import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { Order } from './order.type';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.baseUrl}order`;

  transformToOrder(data: any): Order {
    return {
      id: data.id,
      username: data.User?.username || '',
      orderItems: [...data.OrderItems],
      status: data.status,
      totalAmount: data.totalAmount,
      stripeSessionId: data.stripeSessionId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
  ) {}

  getOrderBySessionId(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${sessionId}`);
  }

  getOrdersByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getAllOrderInfo(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`);
  }
}
