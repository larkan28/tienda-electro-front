import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input()
  product: any;

  constructor(public productService: ProductService) {  }
}
