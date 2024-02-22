import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://apis.datos.gob.ar/georef/api';

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get(`${this.apiUrl}/provincias?campos=id,nombre`);
  }

  getCities(stateId: number) {
    return this.http.get(`${this.apiUrl}/municipios?provincia=${stateId}&campos=id,nombre&max=500`);
  }
}
