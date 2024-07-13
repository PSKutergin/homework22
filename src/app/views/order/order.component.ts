import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderType, OrderTypeResponse } from 'src/types/OrderType';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  isFormSubmitted = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage: string = '';
  isSubmitting = false;
  errorMessageTimeout: number | undefined;
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToQueryParams();
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.errorMessageTimeout) {
      clearTimeout(this.errorMessageTimeout);
    }
  }

  private initForm(): void {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-ЯёЁ]*')]],
      last_name: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-ЯёЁ]*')]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{11}$')]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      product: { value: '', disabled: true },
      comment: ['']
    });
  }

  private subscribeToQueryParams(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.orderForm.patchValue({
        product: params['product']
      });
    });
  }

  get name() {
    return this.orderForm.get('name');
  };

  get last_name() {
    return this.orderForm.get('last_name');
  };

  get phone() {
    return this.orderForm.get('phone');
  };

  get address() {
    return this.orderForm.get('address');
  };

  get country() {
    return this.orderForm.get('country');
  };

  get zip() {
    return this.orderForm.get('zip');
  };

  get product() {
    return this.orderForm.get('product');
  };

  get comment() {
    return this.orderForm.get('comment');
  };

  markAllFieldsAsTouched() {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      control?.markAsTouched();
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    this.markAllFieldsAsTouched();

    if (this.orderForm.invalid) {
      return;
    }

    this.orderForm.get('product')?.enable();
    this.isSubmitting = true;

    const formData: OrderType = this.orderForm.value;
    this.orderService.placeOrder(formData).subscribe({
      next: (response: OrderTypeResponse) => {
        this.isSubmitting = false;
        if (response.success && !response.message) {
          this.showSuccessMessage = true;
          this.errorMessageTimeout = window.setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          this.orderForm.reset();
        } else {
          this.errorMessage = response.message || 'Произошла ошибка. Попробуйте еще раз.';
          this.showErrorMessage = true;
          this.errorMessageTimeout = window.setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'Произошла ошибка. Попробуйте еще раз.';
        this.showErrorMessage = true;
        this.errorMessageTimeout = window.setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      },
      complete: () => {
        this.orderForm.get('product')?.disable();
      }
    });
  }
}