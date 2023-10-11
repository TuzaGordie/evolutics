import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStatusName'
})
export class GetStatusNamePipe implements PipeTransform {

  transform(statusCode: string, statusesList: any[] = [{}]): string {
    return statusesList.find(status => status.code == statusCode)?.title || 'unknown'
  }

}
