import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precision'
})
export class PrecisionPipe implements PipeTransform {

  transform(value: number, length?: number): string {
    let result = "";
    const numberAsString = value?.toString();
    result = numberAsString;
    if (value) {
      length ??= 3;

      if (numberAsString.length >= length) {
        result = "";
        for (let i = 0; i < length; i++) {
          if (Number.isNaN(numberAsString[i])) {
            continue;
          }
          else {
            result += numberAsString[i];
          }
        }
      }
    }
    return result;
  }
}
