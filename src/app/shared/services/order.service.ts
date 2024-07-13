import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderType, OrderTypeResponse } from 'src/types/OrderType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(orderData: OrderType) {
    return this.http.post<OrderTypeResponse>(environment.apiUrl + 'order-tea', orderData);
  }
}