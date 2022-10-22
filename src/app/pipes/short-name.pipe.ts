import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(name?: string): string {
    if (!name) return '';
    return name?.length < 30 ? name : name?.substring(0, 30).concat('...');
  }

}