import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../models/user/user';
import { DashboardService } from '../../../../services/user/dashboard.service';
import { AuthenticationService } from '../../../../services/user/authentication.service';
import { FormValidationModule } from '../../../../modules/form-validation/form-validation.module';
import { UserUpdate } from '../../../../models/user/user-update';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-config-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormValidationModule
  ],
  templateUrl: './config-account.component.html',
  styleUrl: './config-account.component.css'
})
export class ConfigAccountComponent {
  user?: User;
  submitting = false;
  accountForm: FormGroup;

  constructor(fb: FormBuilder, private dash: DashboardService, private auth: AuthenticationService, private toast: HotToastService) {
    this.accountForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.minLength(3)],
      passwordConfirm: [null, Validators.minLength(3)],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.accountForm.reset();
    this.dash.getUser(this.auth.userId).subscribe(result => {
      this.user = result;
      this.updateFormValues();
    });
  }

  updateFormValues() {
    if (!this.user)
      return;

    this.accountForm.setValue({
      email: this.user.email,
      password: null,
      passwordConfirm: null,
      firstName: this.user.firstName,
      lastName: this.user.lastName
    });
  }

  submitAccount() {
    if (!this.user || this.submitting)
      return;

    const userUpdate: UserUpdate = {
      id: this.user.id,
      firstName: this.accountForm.value.firstName,
      lastName: this.accountForm.value.lastName,
      password: this.accountForm.value.password
    }

    this.submitting = true;
    this.dash.updateUser(userUpdate).subscribe({
      next: () => {
        this.getUser();
        this.submitting = false;
        this.toast.success('Datos guardados correctamente', { duration: 4000, dismissible: true });
      },
      error: () => {
        this.submitting = false;
        this.toast.error('Ha ocurrido un error', { duration: 4000, dismissible: true });
      }
    });
  }
}
