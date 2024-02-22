import { Component } from '@angular/core';
import { CartService } from '../../../services/product/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCardModule } from '../../../modules/credit-card/credit-card.module';
import { FormValidationModule } from '../../../modules/form-validation/form-validation.module';

enum Payment {
  None = 0,
  BankTransfer,
  CreditCard,
  Paypal
};

@Component({
  selector: 'app-cart-payment',
  standalone: true,
  imports: [
    CreditCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormValidationModule
  ],
  templateUrl: './cart-payment.component.html',
  styleUrl: './cart-payment.component.css'
})
export class CartPaymentComponent {
  paymentId: Payment = Payment.None;
  cardForm: FormGroup;

  constructor(fb: FormBuilder, public cart: CartService) {
    this.cardForm = fb.group({
      number: [null, [Validators.required, Validators.minLength(19)]],
      fullName: [null, Validators.required],
      expMonth: [null, [Validators.required, Validators.maxLength(2), Validators.min(0), Validators.max(12), Validators.pattern('^[0-9]*$')]],
      expYear: [null, [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]],
      cvv: [null, [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]]
    });
  }

  get valid() {
    return this.paymentId === Payment.CreditCard ? this.cardForm.valid : this.paymentId != Payment.None;
  }

  get payment(): typeof Payment {
    return Payment;
  }
}
