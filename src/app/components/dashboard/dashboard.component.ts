import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../../services/user/authentication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthenticationService, private router: Router, private toast: HotToastService) { }
  
  logout() {
    this.auth.removeToken();
    this.router.navigate(['/home']);
    this.toast.success('Has cerrado sesión correctamente', { duration: 4000, dismissible: true });
  }
}
