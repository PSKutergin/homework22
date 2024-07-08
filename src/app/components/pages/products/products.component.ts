import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ProductType } from '../../../types/ProductType';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  teaProducts: ProductType[] = [];
  searchQuery: string = '';

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.searchTeaProducts(this.searchQuery);
    });
  }

  // Метод для поиска чаев по запросу
  searchTeaProducts(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.getTeaProducts(); // Если запрос пустой, загружаем все товары
      return;
    }

    this.isLoading = true;
    this.productsService.getTeaProductsBySearch(searchTerm).subscribe({
      next: (products: ProductType[]) => {
        this.teaProducts = products;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error searching products:', error);
        this.isLoading = false;
      }
    });
  }

  // Метод для получения списка чаев
  getTeaProducts(): void {
    this.isLoading = true;
    this.productsService.getTeaProducts().subscribe({
      next: (products: ProductType[]) => {
        this.teaProducts = products;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }
}