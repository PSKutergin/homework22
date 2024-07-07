import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  teaProducts: any[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getTeaProducts();
  }

  getTeaProducts(): void {
    this.productsService.getTeaProducts().subscribe(
      (data) => {
        this.teaProducts = data;
        console.log('Товары:', this.teaProducts);
      },
      (error) => {
        console.error('Ошибка получения данных о товарах:', error);
      }
    );
  }
}
