import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sendBy' })
export class SendByPipe implements PipeTransform {
  transform(value: string = ''): string {
    if (!value) return value;
    switch (value.toUpperCase()) {
      case 'P':
        return 'Print';
      case 'E':
        return 'Email';
      case 'S':
        return 'SMS';
      case 'W':
        return 'WebHook';
      default:
        return value;
    }
  }
}
