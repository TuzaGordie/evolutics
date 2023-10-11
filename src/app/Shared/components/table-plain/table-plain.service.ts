import { Injectable } from '@angular/core';
import { IKVP } from '../../models/index.model';

@Injectable()
export class TablePlainService {
  constructor() {}
  formatToColours = (
    key: any,
    codes: IKVP[] = [
      { key: 1, value: 'green' },
      { key: 0, value: 'red' },
      { key: 2, value: 'yellow' },
    ]
  ) => {
    return `<span class="${
      codes.find((x) => x.key == key)?.value || 'default'
    } colour ${key}" ></span>`;
  };
}
