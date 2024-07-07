import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  checkoutForm!: FormGroup;
  isFormSubmitted = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  productName: string = '';

  constructor(private fb: FormBuilder, private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-ЯёЁ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-ЯёЁ]*')]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{11}$')]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\s/-]*')]],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      product: [{ value: '', disabled: true }],
      comment: ['']
    });

    this.route.queryParams.subscribe(params => {
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

    const formData = this.checkoutForm.value;
    this.orderService.placeOrder(formData).subscribe({
      next: (response) => {
        if (response.success === 1) {
          this.showSuccessMessage = true;
        } else {
          this.showErrorMessage = true;
        }
      },
      error: (error) => {
        this.showErrorMessage = true;
      }
    });
  }
}