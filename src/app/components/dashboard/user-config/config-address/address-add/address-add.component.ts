import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../../../../services/user/address.service';
import { CountryService } from '../../../../../services/others/country.service';
import { Address } from '../../../../../models/address';
import { AuthenticationService } from '../../../../../services/user/authentication.service';
import { ConfigAddressComponent } from '../config-address.component';
import { HotToastService } from '@ngneat/hot-toast';
import { FormValidationModule } from '../../../../../modules/form-validation/form-validation.module';
import { selectValidator } from '../../../../../services/others/form-utils.service';

@Component({
  selector: 'app-address-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormValidationModule
  ],
  templateUrl: './address-add.component.html',
  styleUrl: './address-add.component.css'
})
export class AddressAddComponent {
  @ViewChild('closeAddAddress')
  closeModal: ElementRef | undefined;

  submitting: boolean = false;
  addressForm: FormGroup;
  states: any;
  cities: any;

  constructor(fb: FormBuilder, private parent: ConfigAddressComponent, private address: AddressService, private auth: AuthenticationService, private country: CountryService, private toast: HotToastService) {
    this.addressForm = fb.group({
      name: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      street: [null, Validators.required],
      streetNumber: [null, Validators.required],
      department: [''],
      departmentFloor: [''],
      departmentTower: [''],
      state: [null, [Validators.required, selectValidator]],
      city: [null, [Validators.required, selectValidator]],
      zipCode: [null, Validators.required]
    });

    this.getStates();
    this.getCities();
  }

  showModal(){
    if (this.parent.editingId != 0)
      this.loadAddress(this.parent.editingId);
    else
      this.addressForm.reset();
  }

  loadAddress(id: number) {
    this.address.getAddress(id).subscribe({
      next: (result) => {
        this.addressForm.reset();
        this.addressForm.setValue({
          name: result.name,
          firstName: result.firstName,
          lastName: result.lastName,
          phone: result.phone,
          street: result.street,
          streetNumber: result.streetNumber,
          department: result.department,
          departmentFloor: result.departmentFloor,
          departmentTower: result.departmentTower,
          state: result.state,
          city: result.city,
          zipCode: result.zipCode
        });
      }
    });
  }

  getStates() {
    this.addressForm.controls['state'].valueChanges.subscribe(result => this.getCities(result));
    this.country.getStates().subscribe(result => this.states = JSON.parse(JSON.stringify(result)).provincias);
  }

  getCities(value: any = null) {
    var controlCity = this.addressForm.controls['city'];

    controlCity.reset();
    controlCity.disable();

    if (!value || value == 'null')
      return;

    this.country.getCities(value).subscribe(result => {
      this.cities = JSON.parse(JSON.stringify(result)).municipios;
      controlCity.enable();
    });
  }

  submitAddress() {
    this.submitting = true;
    
    const addressDto: Address = {
      id: this.parent.editingId,
      userId: this.auth.userId,
      name: this.addressForm.value.name,
      firstName: this.addressForm.value.firstName,
      lastName: this.addressForm.value.lastName,
      phone: this.addressForm.value.phone,
      street: this.addressForm.value.street,
      streetNumber: Number(this.addressForm.value.streetNumber),
      department: this.notNull(this.addressForm.value.department),
      departmentFloor: Number(this.addressForm.value.departmentFloor),
      departmentTower: this.notNull(this.addressForm.value.departmentTower),
      state: this.addressForm.value.state,
      city: this.addressForm.value.city,
      zipCode: this.addressForm.value.zipCode
    };

    if (addressDto.id != 0) {
      this.address.updateAddress(addressDto).subscribe({
        next: () => {
          this.submitting = false;
          this.addressForm.reset();
          this.parent.getAddresses();
          this.closeModal?.nativeElement.click();
          this.toast.success('El domicilio fue guardado', { duration: 4000, dismissible: true });
        },
        error: () => {
          this.submitting = false;
          this.toast.error('Ha ocurrido un error', { duration: 4000, dismissible: true });
        }
      });
    }
    else {
      this.address.addAddress(addressDto).subscribe({
        next: () => {
          this.submitting = false;
          this.addressForm.reset();
          this.parent.getAddresses();
          this.closeModal?.nativeElement.click();
          this.toast.success('El domicilio fue agregado', { duration: 4000, dismissible: true });
        },
        error: () => {
          this.submitting = false;
          this.toast.error('Ha ocurrido un error', { duration: 4000, dismissible: true });
        }
      });
    }
  }

  notNull(value: any) {
    return value ? value : '';
  }

  get isEditing() {
    return this.parent.editingId != 0;
  }
}
