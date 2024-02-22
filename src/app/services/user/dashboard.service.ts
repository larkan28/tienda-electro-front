import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user/user';
import { UserUpdate } from '../../models/user/user-update';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.endpoint}/api/User`;

  constructor(private http: HttpClient) { }

  getUser(id: number) {
    return this.http.get<User>(`${this.apiUrl}/get/${id}`);
  }

  updateUser(user: UserUpdate) {
    return this.http.put(`${this.apiUrl}/update`, user);
  }
}
