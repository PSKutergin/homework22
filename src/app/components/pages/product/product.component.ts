import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId: string | null = null;
  productName: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Получение параметра id из URL
    this.productId = this.route.snapshot.paramMap.get('id');
    // В реальном приложении здесь можно было бы загрузить данные о товаре по id
    this.productName = 'Товар ' + this.productId; // Заглушка для названия товара
  }

  buy(): void {
    // Переход на страницу оформления заказа и передача параметра
    this.router.navigate(['/order'], { queryParams: { product: this.productName } });
  }
}