import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maritalStatus'
})
export class MaritalStatusPipe implements PipeTransform {

  transform(code: string): string {
    if (!code) return '';
    switch(code){
      case 'M': return 'Married';
      case 'S': return 'Single';
      case 'D': return 'Divorced';
      default: return code;
    }
  }

}
