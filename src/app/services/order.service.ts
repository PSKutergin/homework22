import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderType, OrderTypeResponse } from '../types/OrderType';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(orderData: OrderType) {
    return this.http.post<OrderTypeResponse>('https://testologia.ru/order-tea', orderData);
  }
}