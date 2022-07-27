import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appDecimal' })
export class AppDecimalPipe implements PipeTransform {
  transform(value: number, decimalPlaces = 2): number {
    return value + decimalPlaces;
  }
}
