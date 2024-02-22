import { Component } from '@angular/core';
import { FilterCategoriesComponent } from './filter-categories/filter-categories.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { ProductCatalogComponent } from '../product-catalog.component';

@Component({
  selector: 'app-catalog-filters',
  standalone: true,
  imports: [
    FilterCategoriesComponent,
    FilterOptionsComponent
  ],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.css'
})
export class CatalogFiltersComponent {
  constructor(public catalog: ProductCatalogComponent) { }
}
