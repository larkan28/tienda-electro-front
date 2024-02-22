import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: ``
})
export class MainComponent {
  
}
