import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeFirstChar'
})
export class RemoveFirstCharPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(1, value.length);
  }
}
