import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/product/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductComponent {
  productId: number = 0;
  product: any = null;

  constructor(private route: ActivatedRoute, private router: Router, public productService: ProductService, public cart: CartService) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProduct(this.productId);

    if (!this.product) {
      this.router.navigate(['/']);
      return;
    }
  }

  copyURL() {

  }
}
