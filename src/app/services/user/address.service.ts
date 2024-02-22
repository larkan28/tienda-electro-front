import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl: string = `${environment.endpoint}/api/Address`

  constructor(private http: HttpClient) { }

  getAddress(id: number) {
    return this.http.get<Address>(`${this.apiUrl}/get/${id}`);
  }

  getAddresses(userId: number) {
    return this.http.get<Address[]>(`${this.apiUrl}/list/${userId}`);
  }

  addAddress(address: Address) {
    return this.http.post(`${this.apiUrl}/add`, address);
  }

  removeAddress(id: number) {
    return this.http.delete(`${this.apiUrl}/remove/${id}`);
  }

  updateAddress(address: Address) {
    return this.http.put(`${this.apiUrl}/update`, address);
  }
}
