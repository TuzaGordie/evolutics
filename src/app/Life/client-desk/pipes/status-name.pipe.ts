import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusName'
})
export class StatusNamePipe implements PipeTransform {

  transform(code: string): string {
    switch(code){
      case 'A': return 'Active';
      case 'D': return 'Dead';
      default: return 'unknown';
    }
  }

}
