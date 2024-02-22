import { Injectable } from '@angular/core';
import { ProductCart } from '../../models/product-cart';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: ProductCart[] = [];

  constructor(private product: ProductService) { }

  get total() {
    var result = 0;

    for (let i = 0; i < this.products.length; i++)
      result += this.getProductPrice(i);
    
    return result;
  }

  get empty() {
    return this.products.length < 1;
  }

  get quantity() {
    var result = 0;

    this.products.forEach(element => {
      result += element.quantity;
    });

    return result;
  }

  getProductPrice(index: number) {
    return this.product.getDiscount(this.products[index].product.id) * this.products[index].quantity;
  }

  setProductQuantity(index: number, amount: number) {
    this.products[index].quantity += amount;

    if (this.products[index].quantity < 1)
      this.products[index].quantity = 1;
  }

  addProduct(product: any) {
    if (!product || product.stock < 1)
      return;

    var productId = this.products.findIndex(x => x.product == product);

    if (productId !== -1)
      this.products[productId].quantity++;
    else
      this.products.push({ product: product, quantity: 1 });
  }

  removeProduct(index: number) {
    if (index < 0 || index >= this.products.length)
      return;
    
    this.products.splice(index, 1);
  }

  clear() {
    this.products = [];
  }
}
