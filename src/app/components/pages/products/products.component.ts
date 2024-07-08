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

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getTeaProducts();
  }

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

  // openProduct(product: ProductType): void {
  //   this.router.navigate(['/product', product.id]);
  // }
}
