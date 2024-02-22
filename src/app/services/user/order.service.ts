import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Order } from '../../models/order/order';
import { OrderDto } from '../../models/order/order-dto';
import { OrderProduct } from '../../models/order/order-product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.endpoint}/api/Order`;

  constructor(private http: HttpClient) { }

  getOrder(id: number) {
    return this.http.get<Order>(`${this.apiUrl}/get/${id}`);
  }

  getOrders(userId: number) {
    return this.http.get<Order[]>(`${this.apiUrl}/listOrders/${userId}`);
  }

  getOrderProducts(orderId: number) {
    return this.http.get<OrderProduct[]>(`${this.apiUrl}/listProducts/${orderId}`);
  }

  addOrder(order: OrderDto) {
    return this.http.post(`${this.apiUrl}/add`, order);
  }
}
