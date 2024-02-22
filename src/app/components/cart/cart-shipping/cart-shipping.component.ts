import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigAddressComponent } from '../../dashboard/user-config/config-address/config-address.component';

@Component({
  selector: 'app-cart-shipping',
  standalone: true,
  imports: [
    ConfigAddressComponent,
    FormsModule
  ],
  templateUrl: './cart-shipping.component.html',
  styleUrl: './cart-shipping.component.css'
})
export class CartShippingComponent {
  selectedId = 0;
  
  constructor() { }

  onAddressSelected(id: number) {
    this.selectedId = id;
  }

  get valid() {
    return this.selectedId != 0;
  }
}
