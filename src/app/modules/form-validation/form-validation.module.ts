import { NgModule } from '@angular/core';
import { FormValid, FormValidFeedback, FormValidInput } from './form-validation.directive';

@NgModule({
  imports: [
    FormValid,
    FormValidInput,
    FormValidFeedback
  ],
  exports: [
    FormValid,
    FormValidInput,
    FormValidFeedback
  ]
})
export class FormValidationModule { }
