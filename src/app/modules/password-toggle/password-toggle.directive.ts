import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[passwordToggle]',
  exportAs: 'passwordToggle',
  standalone: true,
  host: {
    '[type]': `showing ? 'text' : 'password'`,
  }
})
export class PasswordToggle {
  showing: boolean = false;

  toggle() {
    this.showing = !this.showing;
  }
}

@Directive({
  selector: '[passwordToggleIcon]',
  standalone: true,
  host: {
    class: 'fa-solid',
    '[class.fa-eye]': 'parent.showing',
    '[class.fa-eye-slash]': '!parent.showing'
  }
})
export class PasswordToggleIcon {
  @Input('parentToggle')
  parent?: PasswordToggle

  @HostListener('click', ['$event'])
  onClick() {
    this.parent?.toggle();
  }
}
