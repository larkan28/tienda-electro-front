import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CatalogItemsComponent } from './catalog-items/catalog-items.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';

const filtersDir = "/assets/data/filters";

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [
    CatalogItemsComponent,
    CatalogFiltersComponent
  ],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.css'
})
export class ProductCatalogComponent {
  filterForm: FormGroup = new FormGroup([]);
  filters: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, public product: ProductService) {
    this.route.paramMap.subscribe(result => this.loadFilters(result.get('category')));
  }

  loadFilters(category: string | null) {
    var url = `${filtersDir}/${category}.json`;

    this.http.get(url).subscribe({
      next: (result) => {
        this.filters = result;
        this.filterForm.valueChanges.subscribe(value => this.onFormChange(value));
        this.createControls();
      },
      error: () => {
        this.filters = null;
        this.router.navigate(['/products']);
      }
    });
  }

  onFormChange(value: any) {
    if (!this.filterForm.dirty)
      return;

    const queryParams = value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  createControls() {
    for (const field in this.filterForm.controls)
      this.filterForm.removeControl(field);

    for (const item of this.filters)
      this.filterForm.addControl(item.group, new FormControl(null));

    this.applyQueryParams();
  }

  applyQueryParams() {
    var params = this.route.snapshot.queryParams;

    if (Object.keys(params).length < 1)
      return;

    for (const item in params) {
      var value = params[item];

      if (!this.filterForm.contains(item) || !this.isValidParam(item, value)) {
        this.router.navigate(['/products']);
        return;
      }

      this.filterForm.controls[item].setValue(value);
    }

    this.filterForm.markAsDirty();
  }

  removeFilter(control: string) {
    this.filterForm.controls[control].setValue(null);
  }

  isValidParam(control: string, value: string) {
    var filter = this.getFilter(control);

    if (!filter)
      return false;

    return filter.options ? (filter.options.find((x: { value: string; }) => x.value === value) ? true : false) : true;
  }

  getCategory() {
    return this.route.snapshot.paramMap.get('category');
  }

  getFilter(group: string) {
    return this.filters.find((x: { group: string; }) => x.group === group);
  }

  getBadges() {
    var output: any[] = [];

    for (const field in this.filterForm.controls) {
      var value = this.filterForm.controls[field].value;

      if (value === null)
        continue;

      var data = this.getFilter(field);
      var title = data.title;
      var option = data.options ? data.options.find((x: { value: any; }) => x.value === value).title : value;

      output.push({ title: title, control: field, option: option });
    }

    return output;
  }

  getPipeFilters() {
    var output: any[] = [{ field: 'category', value: this.getCategory(), property: 'category' }];

    for (const field in this.filterForm.controls) {
      var data = this.getFilter(field);
      var value = this.filterForm.controls[field].value;

      output.push({ 
        field: field, 
        value: value, 
        property: data.property, 
        operation: data.operation 
      });
    }

    return output;
  }
}
