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
    let indexOfComma = -1;
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === '.' || text.charAt(i) === ',') {
        indexOfComma = i;
        break;
      }
    }
    text = text.replaceAll('.', '');
    text = text.replaceAll(',', '');
    if (indexOfComma === 0) {
      text = '0.' + text;
    } else if (indexOfComma > 0) {
      text =
        text.substring(0, indexOfComma) +
        '.' +
        (text.length > indexOfComma ? text.substring(indexOfComma) : '');
    }
    this.el.nativeElement.value = text;
  }
}
