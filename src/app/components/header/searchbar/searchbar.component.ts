import { Component } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/product/cart.service';
import { AuthenticationService } from '../../../services/user/authentication.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    DashboardComponent,
    LoginComponent,
    RouterModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  constructor(public cart: CartService, public auth: AuthenticationService) { }
}
