import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDecimalDirective } from './number-decimal.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NumberDecimalDirective],
  exports: [NumberDecimalDirective],
})
export class NumberDecimalModule {}
