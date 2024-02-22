import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const errorsDir = "assets/data/errors.json";

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {
  errorList: any;

  constructor(private http: HttpClient) {
    this.http.get(errorsDir).subscribe(result => this.errorList = result);
  }
}

export function confirmPasswordValidator(control: AbstractControl) {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (password && passwordConfirm && password.value !== passwordConfirm.value)
    return { 'passwordNotMatch': true };

  return null;
}

export function selectValidator(control: AbstractControl) {
  if (control && control.value == 'null')
    return { 'selectedNone': true };

  return null;
}