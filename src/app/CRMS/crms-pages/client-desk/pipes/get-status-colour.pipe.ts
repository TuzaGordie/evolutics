import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStatusColour'
})
export class GetStatusColourPipe implements PipeTransform {

  transform(statusCode: string): string {
    switch(statusCode){
      case 'A': return 'success';
      case 'D': return 'danger';
      default: return 'dark'
    }
  }
  
}
