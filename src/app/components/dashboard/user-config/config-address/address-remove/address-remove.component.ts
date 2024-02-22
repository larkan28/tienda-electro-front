import { Component, ElementRef, ViewChild } from '@angular/core';
import { AddressService } from '../../../../../services/user/address.service';
import { ConfigAddressComponent } from '../config-address.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-address-remove',
  standalone: true,
  imports: [],
  templateUrl: './address-remove.component.html',
  styleUrl: './address-remove.component.css'
})
export class AddressRemoveComponent {
  @ViewChild('closeRemoveAddress')
  closeModal: ElementRef | undefined;
  
  loading: boolean = false;

  constructor(private address: AddressService, private parent: ConfigAddressComponent, private toast: HotToastService) { }

  remove() {
    this.loading = true;

    this.address.removeAddress(this.parent.editingId).subscribe({
      next: () => {
        this.loading = false;
        this.parent.getAddresses();
        this.closeModal?.nativeElement.click();
        this.toast.success('El domicilio fue borrado', { duration: 4000, dismissible: true });
      },
      error: () => {
        this.loading = false;
        this.toast.error('Ha ocurrido un error', { duration: 4000, dismissible: true });
      }
    });
  }
}
