import { NgModule } from '@angular/core';
import { StepperContainer, StepperContent, StepperItem, StepperOutlet } from './stepper.directive';

@NgModule({
  declarations: [],
  imports: [
    StepperContainer,
    StepperContent,
    StepperOutlet,
    StepperItem
  ],
  exports: [
    StepperContainer,
    StepperContent,
    StepperOutlet,
    StepperItem
  ]
})
export class StepperModule { }
