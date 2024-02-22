import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const productsDir = "/assets/data/products.json";
const categoriesDir = "/assets/data/categories.json";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any;
  categories: any;

  constructor(private http: HttpClient) {
    this.http.get(productsDir).subscribe(result => this.products = result);
    this.http.get(categoriesDir).subscribe(result => this.categories = result);
  }

  getCategory(group: string) {
    return this.categories.find((x: { group: string; }) => x.group == group);
  }

  getProduct(index: number) {
    return this.products ? this.products[index] : null;
  }

  getStockLevel(index: number) {
    var percent = this.products[index].stock / this.products[index].stockMax;
    return percent == 0 ? 'low' : percent > 0.5 ? 'high' : 'medium';
  }

  getDiscount(index: number) {
    return this.products[index].price - (this.products[index].price * this.products[index].off);
  }

  sort(option: any) {
    switch (option.value) {
      case 'low-price':
        this.products.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
        break;
      case 'high-price':
        this.products.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
        break;
      case 'name':
        this.products.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name))
        break;
    }
  }
}
