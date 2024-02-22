import { Component, ViewChild } from '@angular/core';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { CartShippingComponent } from './cart-shipping/cart-shipping.component';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/product/cart.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/user/authentication.service';
import { OrderDto } from '../../models/order/order-dto';
import { OrderService } from '../../services/user/order.service';
import { OrderProductDto } from '../../models/order/order-product-dto';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartPaymentComponent,
    CartProductsComponent,
    CartShippingComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @ViewChild(CartPaymentComponent)
  payment?: CartPaymentComponent;

  @ViewChild(CartShippingComponent)
  shipping?: CartShippingComponent;

  constructor(public cart: CartService, private auth: AuthenticationService, private order: OrderService) { }

  finishOrder() {
    if (!this.shipping || !this.payment)
      return;

    const products: OrderProductDto[] = [];

    this.cart.products.forEach(element => {
      products.push({ 
        productId: element.product.id, 
        quantity: element.quantity 
      });
    });

    const order: OrderDto = {
      userId: this.auth.userId,
      addressId: this.shipping.selectedId,
      payment: this.payment.paymentId,
      status: 0,
      total: this.cart.total,
      products: products
    }

    this.order.addOrder(order).subscribe({
      next: () => {
        console.log("asd");
      },
      error: () => {
        console.log("lel");
      }
    });
  }

  get valid() {
    return this.payment?.valid && this.shipping?.valid;
  }
}
