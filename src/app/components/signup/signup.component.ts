import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserSignup } from '../../models/user/user-signup';
import { FormUtilsService, confirmPasswordValidator } from '../../services/others/form-utils.service';
import { PasswordToggleModule } from '../../modules/password-toggle/password-toggle.module';
import { FormValidationModule } from '../../modules/form-validation/form-validation.module';
import { AuthenticationService } from '../../services/user/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordToggleModule,
    FormValidationModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild('closeSignup') closeModal: ElementRef | undefined
  
  signupForm: FormGroup;
  submitting = false;

  constructor(fb: FormBuilder, public fu: FormUtilsService, private auth: AuthenticationService, private router: Router, private toast: HotToastService) {
    this.signupForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      passwordConfirm: [null, [Validators.required, Validators.minLength(3)]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      acceptConditions: [null, Validators.requiredTrue]
    }, {
      validators: [confirmPasswordValidator]
    });
  }

  submitSignup() {
    if (this.submitting)
      return;

    this.submitting = true;

    const userSignup: UserSignup = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName
    }
    
    this.auth.signup(userSignup).subscribe({
      next: () => {
        this.submitting = false;
        this.signupForm.reset();
        this.router.navigate(['/home']);
        this.closeModal?.nativeElement.click();
        this.toast.success('Registro completado exitosamente', { duration: 8000, dismissible: true });
      },
      error: (error) => {
        if (error.error.includes('e-mail'))
          this.signupForm.controls['email'].setErrors({ 'duplicated': true });

        this.submitting = false;
        this.toast.error("Ha ocurrido un error", { duration: 8000, dismissible: true });
      }
    });
  }
}
