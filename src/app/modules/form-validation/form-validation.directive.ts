import { Component, Directive, Input, ViewChild, inject, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtilsService } from '../../services/others/form-utils.service';

@Directive({
  selector: '[formValid]',
  standalone: true,
})
export class FormValid {
  @Input()
  formGroup?: FormGroup;
}

@Directive({
  selector: '[formValidInput]',
  standalone: true,
  host: {
    class: 'form-control',
    '[class]': 'isValid()',
  }
})
export class FormValidInput {
  parent = inject(FormValid);

  @Input()
  formControlName: string = '';

  @Input()
  validate: string = '';

  isValid() {
    var control = this.parent.formGroup?.controls[this.formControlName];

    if (control)
      return !control.touched ? null : (control.errors || this.parent.formGroup?.hasError(this.validate)) ? 'is-invalid' : 'is-valid';

    return null;
  }
}

@Component({
  selector: 'form-valid-feedback',
  standalone: true,
  template: `
    <ul class="m-0 p-0 list-style-none">
      @if (parentErrors) { <li>{{getFeedback(true)}}</li> }
      <li>{{getFeedback()}}</li>
    </ul>
  `
})
export class FormValidFeedback {
  parent: FormValid = inject(FormValid);

  @Input()
  control: string = '';

  @Input()
  parentErrors: boolean = false;

  constructor(public formUtil: FormUtilsService) {

  }

  getFeedback(fromParent: boolean = false) {
    var form = this.parent.formGroup;

    if (!this.formUtil.errorList || !form)
      return null;

    var errors = fromParent ? form.errors : form.controls[this.control].errors;

    for (const key in errors) {
      var error = this.formUtil.errorList.find((x: { error: string; }) => x.error == key);

      if (error) {
        var output: string = error.message;

        if (output.includes('<length>'))
          output = output.replace('<length>', errors[key].requiredLength);

        return output;
      }
    }

    return null;
  }
}