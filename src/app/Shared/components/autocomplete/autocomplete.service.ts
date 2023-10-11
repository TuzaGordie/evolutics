import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IOption } from '../input/input-basic.component';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  constructor() {}
  filterOptions(query: string, options: IOption[]): IOption[] {
    const filterValue = this.normalizeValue(query);
    return filterValue
      ? options?.filter((option) =>
          this.normalizeValue(option.label).includes(filterValue)
        )
      : options;
  }

  normalizeValue(value: string): string {
    return value?.toString()?.toLowerCase().replace(/\s/g, '');
  }
}
