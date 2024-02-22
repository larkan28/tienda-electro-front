import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../models/user/user-login';
import { TokenResponse } from '../../models/token-response';
import { UserSignup } from '../../models/user/user-signup';

const tokenKey = "jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string = `${environment.endpoint}/api/User`

  constructor(private http: HttpClient) { }

  login(user: UserLogin) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, user);
  }

  signup(user: UserSignup) {
    return this.http.post<UserSignup>(`${this.apiUrl}/signup`, user)
  }

  removeToken() {
    localStorage.removeItem(tokenKey);
  }

  getToken() {
    return localStorage.getItem(tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(tokenKey, token);
  }

  isLoggedIn() {
    return this.getToken();
  }

  isTokenExpired(token: string) {
    return (Math.floor((new Date).getTime() / 1000)) >= this.getClaims(token).exp;
  }

  getClaims(token: string) {
    return (JSON.parse(atob(token.split('.')[1])));
  }

  get userId() {
    const token = this.getToken();
    return token ? Number(this.getClaims(token).id) : 0;
  }
}
