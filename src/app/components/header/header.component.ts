import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchbarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
