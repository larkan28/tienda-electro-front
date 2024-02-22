import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Address } from '../../../../models/address';
import { AddressService } from '../../../../services/user/address.service';
import { AddressAddComponent } from './address-add/address-add.component';
import { AddressRemoveComponent } from './address-remove/address-remove.component';
import { AuthenticationService } from '../../../../services/user/authentication.service';

@Component({
  selector: 'app-config-address',
  standalone: true,
  imports: [
    AddressAddComponent,
    AddressRemoveComponent
  ],
  templateUrl: './config-address.component.html',
  styleUrl: './config-address.component.css'
})
export class ConfigAddressComponent {
  @Input()
  selectable: boolean = false;

  @ViewChild(AddressAddComponent)
  child?: AddressAddComponent;

  @Output()
  onSelected = new EventEmitter<number>();
  
  addresses: Address[] = [];
  editingId: number = 0;
  currentId: number = 0;

  constructor(private address: AddressService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses() {
    this.address.getAddresses(this.auth.userId).subscribe(result => this.addresses = result);
  }

  selectAddress(id: number) {
    if (!this.selectable)
      return;
    
    this.currentId = id;
    this.onSelected.emit(this.currentId);
  }

  cardSelected(id: number) {
    return { 'cursor-pointer': this.selectable, 'border-primary': this.selectable && this.currentId === id };
  }
}
