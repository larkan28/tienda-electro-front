import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  brands: string[] = [
    "assets/imgs/brands/amd.png",
    "assets/imgs/brands/intel.png",
    "assets/imgs/brands/nvidia.png",
    "assets/imgs/brands/corsair.png",
    "assets/imgs/brands/logitech.png",
    "assets/imgs/brands/asus.png",
    "assets/imgs/brands/western_digital.png",
    "assets/imgs/brands/acer.png"
  ];
  banners: string[] = [
    "assets/imgs/banners/banner_1.jpg",
    "assets/imgs/banners/banner_2.jpg",
    "assets/imgs/banners/banner_3.jpg",
    "assets/imgs/banners/banner_4.jpg"
  ];
  breakpointsOne = { 320: { slidesPerView: 1 }, 640: { slidesPerView: 4 } };
  breakpointsTwo = { 320: { slidesPerView: 2 }, 640: { slidesPerView: 4 } };

  constructor(public product: ProductService) { }
}
