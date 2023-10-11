import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spliceName'
})
export class SpliceNamePipe implements PipeTransform {

  transform(code: string): string {
    switch(code){
      case 'DL': return 'Daily';
      case 'WK': return 'Weekly';
      case 'BW': return 'Bi-Weekly';
      case 'MT': return 'Monthly';
      case 'QT': return 'Quarterly';
      case 'SA': return 'Semi-Annually';
      case 'AN': return 'Annually';
      default: return '';
    }
  }

}
