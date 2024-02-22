import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items = [
    { title: 'Inicio', link: '/home', icon: 'fa-home' },
    { title: 'Productos', link: '/products', icon: 'fa-list-ul' },
    { title: 'Ayuda', link: '/help', icon: 'fa-circle-question' },
  ];
}
