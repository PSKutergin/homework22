import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { OrderType } from '../../types/OrderType';

interface OrderResponse {
  success: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  isFormSubmitted = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  productName: string = '';
  isSubmitting = false; // Флаг для управления состоянием кнопки
  errorMessageTimeout: number | undefined; // Типизированный таймаут для автоматического скрытия ошибки
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
      clearTimeout(this.errorMessageTimeout); // Очистка таймаута при уничтожении компонента
    }
  }

  private initForm(): void {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-ЯёЁ]*')]],
      last_name: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-ЯёЁ]*')]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{11}$')]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\s/-]*')]],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      product: [{ value: '', disabled: true }],
      comment: ['']
    });
  }

  private subscribeToQueryParams(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.productName = params['product'] || '';
      this.checkoutForm.patchValue({
        product: this.productName
      });
    });
  }

  get formControls() {
    return this.checkoutForm.controls;
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }

    this.isSubmitting = true; // Кнопка становится недоступной

    const formData: OrderType = this.checkoutForm.value;
    this.orderService.placeOrder(formData).subscribe({
      next: (response: OrderResponse) => {
        this.isSubmitting = false; // Кнопка снова становится доступной
        if (response.success === 1) {
          this.showSuccessMessage = true;
          this.errorMessageTimeout = window.setTimeout(() => {
            this.showSuccessMessage = false; // Скрыть сообщение об успешном заказе через 3 секунды
          }, 3000);
        } else {
          this.showErrorMessage = true;
          this.errorMessageTimeout = window.setTimeout(() => {
            this.showErrorMessage = false; // Скрыть сообщение об ошибке через 3 секунды
          }, 3000);
        }
      },
      error: (error: any) => {
        this.isSubmitting = false; // Кнопка снова становится доступной
        this.showErrorMessage = true;
        this.errorMessageTimeout = window.setTimeout(() => {
          this.showErrorMessage = false; // Скрыть сообщение об ошибке через 3 секунды
        }, 3000);
      }
    });
  }
}