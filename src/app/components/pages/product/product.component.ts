import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductType } from 'src/app/types/ProductType';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isLoading = false;
  productId: string | null = null;
  product: ProductType | null = null;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.isLoading = true;
      this.productsService.getTeaProductById(this.productId).subscribe({
        next: (product: ProductType) => {
          this.product = product;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading product:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.router.navigate(['/products']);
    }
  }

  buy(): void {
    this.router.navigate(['/order'], { queryParams: { product: this.product?.title } });
  }
}