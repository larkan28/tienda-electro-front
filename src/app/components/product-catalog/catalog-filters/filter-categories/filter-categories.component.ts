import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';

@Component({
  selector: 'app-filter-categories',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './filter-categories.component.html',
  styleUrl: './filter-categories.component.css'
})
export class FilterCategoriesComponent {
  constructor(private route: ActivatedRoute, public product: ProductService) { }

  isActive(group: string) {
    return { 'cat-active': this.route.snapshot.paramMap.get('category') === group }
  }
}
