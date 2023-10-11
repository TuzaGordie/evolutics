import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(code: string): string {
    if (!code) return '';
    switch(code.toUpperCase()){
      case 'M': return 'Male';
      case 'F': return 'Female';
      default: return '';
    }
  }

}
