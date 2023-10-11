import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountLedgerService {
  monthDigits = {
    JANUARY: '01',
    FEBRUARY: '02',
    MARCH: '03',
    APRIL: '04',
    MAY: '05',
    JUNE: '06',
    JULY: '07',
    AUGUST: '08',
    SEPTEMBER: '09',
    OCTOBER: '10',
    NOVEMBER: '11',
    DECEMBER: '12',
  };

  comparators = {
    DL: this.dailySortComparator,
    WK: this.weeklySortComparator,
    BW: this.biWeeklySortComparator,
    MT: this.monthlySortComparator,
    QT: this.quarterlySortComparator,
    SA: this.semiAnnuallySortComparator,
    AN: this.annuallySortComparator,
  };

  constructor() {}

  sortData(data, { scheduled }): any[] {
    // convert to array
    let result = Object.entries(data) as any;
    // sort using appropriate comparator
    return result.sort(this.comparators[scheduled]);
  }

  getLabels(data, query) {
    let sorted = this.sortData(data, query);
    return sorted.map(([key]) => key);
  }

  getValues(data, query) {
    let sorted = this.sortData(data, query);
    return sorted.map(([, value]) => value);
  }

  dailySortComparator(a: Entry, b: Entry) {
    // a[0] and b[0] look like "yyyy-mm-dd"
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      // when they are equal
      return 0;
    }
  }

  weeklySortComparator(a: Entry, b: Entry) {
    // a[0] and b[0] look like "yyyy-mm-dd - yyyy-mm-dd"
    const startA = a[0].split(' - ')[0];
    const startB = b[0].split(' - ')[0];

    return this.dailySortComparator([startA], [startB]);
  }

  biWeeklySortComparator(a, b) {
    // a[0] and b[0] look like "yyyy-mm-dd - yyyy-mm-dd"
    return this.weeklySortComparator(a, b);
  }

  monthlySortComparator(a, b) {
    // a[0] and b[0] look like "yyyy MONTH"

    const [yearA, monthA] = a[0].split(' ');
    const [yearB, monthB] = b[0].split(' ');

    const dateA = `${yearA}-${this.monthDigits[monthA]}-01`;
    const dateB = `${yearB}-${this.monthDigits[monthB]}-01`;

    return this.dailySortComparator([dateA], [dateB]);
  }

  quarterlySortComparator(a, b) {
    // a[0] and b[0] look like "yyyy-mm-dd - yyyy-mm-dd"
    return this.weeklySortComparator(a, b);
  }

  semiAnnuallySortComparator(a, b) {
    // a[0] and b[0] look like "yyyy-mm-dd - yyyy-mm-dd"
    return this.weeklySortComparator(a, b);
  }

  annuallySortComparator(a, b) {
    // a[0] and b[0] look like "yyyy-mm-dd - yyyy-mm-dd"
    return this.weeklySortComparator(a, b);
  }
}

type Entry = [string, number?];
