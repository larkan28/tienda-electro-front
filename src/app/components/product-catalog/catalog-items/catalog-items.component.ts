import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { ProductCatalogComponent } from '../product-catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFilterPipe } from '../../../pipes/product-filter.pipe';

@Component({
  selector: 'app-catalog-items',
  standalone: true,
  imports: [
    ProductFilterPipe,
    ProductDetailComponent
  ],
  templateUrl: './catalog-items.component.html',
  styleUrl: './catalog-items.component.css'
})
export class CatalogItemsComponent {
  constructor(public product: ProductService, public catalog: ProductCatalogComponent) {}
}
