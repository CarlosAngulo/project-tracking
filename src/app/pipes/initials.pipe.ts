import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(name?: string): string {
    return name?.split(' ').map(name => name.substring(0,1)).join('') || '';
  }

}
