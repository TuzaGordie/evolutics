import { Injectable } from '@angular/core';
import isoCountries from '../../../../assets/data/iso-3166.json';
export interface ICountry {
  name: string;
  alpha2: string;
  alpha3: string;
  countryCode: string;
  'iso_3166-2': string;
  region: string;
  subRegion: string;
  intermediateRegion: string;
  regionCode: string;
  subRegionCode: string;
  intermediateRegionCode: string;
}
@Injectable({
  providedIn: 'root',
})
export class PhoneNumberService {
  isoCountries: ICountry[] = isoCountries;
  constructor() {}
  getByCode3(code: string) {  
    return isoCountries.find((x) => x.alpha3 == code);
  }
}
