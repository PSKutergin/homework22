import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from 'src/types/ProductType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getTeaProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.apiUrl + 'tea');
  }

  getTeaProductById(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${environment.apiUrl}tea?id=${id}`);
  }

  getTeaProductsBySearch(query: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${environment.apiUrl}/tea?search=${encodeURIComponent(query)}`);
  }
}