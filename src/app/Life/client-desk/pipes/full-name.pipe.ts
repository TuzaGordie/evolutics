import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform({ firstName, middleName, surname }): string {
    firstName = firstName ? `${firstName} ` : '';
    middleName = middleName ? `${middleName} ` : '';
    surname = surname ? surname : '';
    return firstName + middleName + surname;
  }
}
