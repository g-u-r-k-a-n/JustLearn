import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, limit?: number): string {

    let str;
    limit ??= 160;

    if (value && value.length > limit) {
      str = value.substring(0, limit);
      str = str.trim();
      if (!str.endsWith(".")) {
        str = str + "...";
      }
      else {
        str = str + "..";
      }
    }
    else {
      str = value;
    }

    return str;
  }

}
