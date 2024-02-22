import { NgModule } from '@angular/core';
import { PasswordToggle, PasswordToggleIcon } from './password-toggle.directive';

@NgModule({
  imports: [
    PasswordToggle,
    PasswordToggleIcon
  ],
  exports: [
    PasswordToggle,
    PasswordToggleIcon
  ]
})
export class PasswordToggleModule { }
