import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[credit-card]',
  standalone: true
})
export class CreditCardDirective {
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = Array.from(input.value.replaceAll(/\D/g, '').matchAll(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/g))[0].slice(1, 5).join(' ').trim()
  }
}
