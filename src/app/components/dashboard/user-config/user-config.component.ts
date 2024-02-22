import { Component } from '@angular/core';
import { ConfigAccountComponent } from './config-account/config-account.component';
import { ConfigAddressComponent } from './config-address/config-address.component';

@Component({
  selector: 'app-user-config',
  standalone: true,
  imports: [
    ConfigAccountComponent,
    ConfigAddressComponent
  ],
  templateUrl: './user-config.component.html',
  styleUrl: './user-config.component.css'
})
export class UserConfigComponent {

}
