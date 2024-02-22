import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { PasswordToggleModule } from '../../modules/password-toggle/password-toggle.module';
import { FormValidationModule } from '../../modules/form-validation/form-validation.module';
import { RecoveryComponent } from '../recovery/recovery.component';
import { AuthenticationService } from '../../services/user/authentication.service';
import { TokenResponse } from '../../models/token-response';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SignupComponent,
    RecoveryComponent,
    PasswordToggleModule,
    FormValidationModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('closeLogin')
  closeModal: ElementRef | undefined;
  
  loginForm: FormGroup;
  submitting = false;

  constructor(fb: FormBuilder, private auth: AuthenticationService, private toast: HotToastService) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      remember: [null]
    });
  }

  loginSubmit() {
    if (this.submitting)
      return;
    
    this.submitting = true;

    const userLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.auth.login(userLogin).subscribe({
      next: (result: TokenResponse) => {
        this.loginForm.reset();
        this.submitting = false;
        this.auth.setToken(result.token);
        this.closeModal?.nativeElement.click();
        this.toast.success('Has iniciado sesión correctamente', { duration: 8000, dismissible: true });
      },
      error: () => {
        this.submitting = false;
        this.toast.error('Los datos son incorrectos', { duration: 8000, dismissible: true });
      }
    });
  }
}
