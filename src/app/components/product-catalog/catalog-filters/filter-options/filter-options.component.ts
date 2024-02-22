import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCatalogComponent } from '../../product-catalog.component';

@Component({
  selector: 'app-filter-options',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.css'
})
export class FilterOptionsComponent {
  constructor(public catalog: ProductCatalogComponent) { }
}
