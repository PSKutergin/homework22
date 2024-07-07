import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderType } from '../components/types/OrderType';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(orderData: OrderType) {
    return this.http.post<any>('https://testologia.site/order-tea', orderData);
  }
}