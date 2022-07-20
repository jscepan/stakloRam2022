import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimal]',
})
export class NumberDecimalDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keyup') keyup() {
    this.validateNumber(this.el.nativeElement.value);
  }

  private validateNumber(text: string) {
    text = text.replace(/[^\d,.-]/g, '');
    this.el.nativeElement.value = text;
  }
}
